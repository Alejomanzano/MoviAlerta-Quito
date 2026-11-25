import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Stop } from './entities/stop.entity.js';
import { Route } from '../routes/entities/route.entity.js';
import { RouteStop } from '../route-stops/entities/route-stop.entity.js';

@Injectable()
export class StopsService {
  constructor(
    @InjectRepository(Stop)
    private stopRepository: Repository<Stop>,

    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
    
    @InjectRepository(RouteStop)
    private routeStopRepository: Repository<RouteStop>,

  ) {}

  // Crear una parada
  async create(data: any) {
    const route = await this.routeRepository.findOneBy({
      id: Number(data.routeId),
    });

    if (!route) {
      throw new NotFoundException('La ruta seleccionada no existe');
    }

    const sequence = Number (data.sequence);
    if(!Number.isInteger(sequence) || sequence < 1){
      throw new BadRequestException(
        'La secuencia debe ser un numero mayor a cero',
      )
    }

    const existingSequence = await this.routeStopRepository.findOne({
      where: {
        route: {id: route.id},
        sequence,
      },
    });

    if(existingSequence){
      throw new ConflictException(
        'Ya existe una parada en esta posicion de la ruta',
      );
    }
    

    const stop = this.stopRepository.create({
      name: data.name,
      address: data.address,
      description: data.description,
      isActive: data.isActive ?? true,
      
    });

    const savedStop = await this.stopRepository.save(stop);

    const routeStop= this.routeStopRepository.create({
      route,
      stop: savedStop,
      sequence,
    })

    await this.routeStopRepository.save(routeStop);

    return savedStop;
  }

  // Consultar todas las paradas
  async findAll() {
    return await this.stopRepository.find({
      relations: {
        routeStops: {
          route: true,
        },
      },

      order: {
        id: 'ASC'
      }
    });
  }

  // Consultar una parada por ID
  async findOne(id: number) {
    const stop = await this.stopRepository.findOne({
      where: { id },
      relations: {
        routeStops:{
          route: true,
        }
      },
    });

    if (!stop) {
      throw new NotFoundException('Parada no encontrada');
    }

    return stop;
  }

  // Actualizar una parada
  async update(id: number, data: any) {
    const stop = await this.findOne(id);

    let routeToAssociate: Route | null = null;
    let sequence = 0;

    //Validar la ruta antes de guardar cambios
    if(data.routeId !== undefined){
      const route = await this.routeRepository.findOneBy({
        id: Number(data.routeId),
      });

      if(!route){
      throw new NotFoundException(
        'La ura seleccionada no existe'
      );
    }

    const existingRelation = await this.routeStopRepository.findOne({
      where: {
        route: { id: route.id},
        stop: {id: stop.id}
      },
    });

    //Si la parada todavia no pertenece a esa ruta
    if(!existingRelation){
      sequence = Number(data.sequence);

      if(!Number.isInteger(sequence) ||sequence < 1){
        throw new BadRequestException(
          'La secuencia debe ser un numero mayor a cero'
        );
      }

      const existingSequence = await this.routeStopRepository.findOne({
        where: {
          route:{ id: route.id},
          sequence,
        },
      });

      if(existingSequence){
        throw new ConflictException(
          'Ya existe una parada en esta posicion de la ruta',
        );
      }

      routeToAssociate = route;
      }
  }

  Object.assign(stop, {
    name: data.name ?? stop.name, 
    address: data.address ?? stop.address,
    isActive: data.isActive ?? stop.isActive,
  });

  await this.stopRepository.save(stop);

  if(routeToAssociate){
    const routeStop = this.routeStopRepository.create({
      route: routeToAssociate,
      stop,
      sequence,
    });

    await this.routeStopRepository.save(routeStop);
  }

  return await this.findOne(id);

}
  // Eliminar una parada
  async remove(id: number) {
    const stop = await this.findOne(id);

    await this.routeStopRepository.delete({
      stop: {id: stop.id},
    });

    await this.stopRepository.remove(stop);

    return { message: 'Parada eliminada correctamente' };
  }
}
