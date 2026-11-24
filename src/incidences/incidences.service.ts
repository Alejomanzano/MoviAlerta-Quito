
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Incidence } from './entities/incidence.entity.js';
import { Route } from '../routes/entities/route.entity.js';
import { Stop } from '../stops/entities/stop.entity.js';
import { RouteStop } from '../route-stops/entities/route-stop.entity.js';


@Injectable()
export class IncidencesService {
  constructor(
    @InjectRepository(Incidence)
    private incidenceRepository: Repository<Incidence>,

    @InjectRepository(Route)
    private routeRepository: Repository<Route>,

    @InjectRepository(Stop)
    private stopRepository: Repository<Stop>,

    @InjectRepository(RouteStop)
    private routeStopRepository: Repository<RouteStop>,

  ) {}

  // Crear una incidencia
  async create(data: any) {
    const route = await this.routeRepository.findOneBy({
      id: Number(data.routeId),
    });

    if (!route) {
      throw new NotFoundException('La ruta seleccionada no existe');
    }

    let stop: Stop | null = null;

    if (data.stopId !== undefined && data.stopId !== null) {
      stop = await this.stopRepository.findOneBy({
        
        id:Number(data.stopId),
        
      });

      if (!stop) {
        throw new NotFoundException('La parada seleccionada no existe');
      }

      const routeStop = await this.routeStopRepository.findOne({
        where: {
          route: { id: route.id},
          stop: {id: stop.id},
        },
      })

      if(!routeStop){
        throw new NotFoundException(
          'la parada no pertence a la ruta'
        )
      }
    }

    const incidence = this.incidenceRepository.create({
      type: data.type,
      description: data.description,
      severity: data.severity,
      isActive: data.isActive ?? true,
      route,
      stop,
    });

    return await this.incidenceRepository.save(incidence);
  }

  // Consultar todas las incidencias
  async findAll() {
    return await this.incidenceRepository.find({
      relations: {
        route: true,
        stop: true,
      },
    });
  }

  // Consultar una incidencia por ID
  async findOne(id: number) {
    const incidence = await this.incidenceRepository.findOne({
      where: { id },
      relations: {
        route: true,
        stop: true,
      },
    });

    if (!incidence) {
      throw new NotFoundException('Incidencia no encontrada');
    }

    return incidence;
  }

  // Actualizar una incidencia
  async update(id: number, data: any) {
    const incidence = await this.findOne(id);

    const routeId =
      data.routeId !== undefined
        ? Number(data.routeId)
        : incidence.route.id;

    const route = await this.routeRepository.findOneBy({
      id: routeId,
    });

    if (!route) {
      throw new NotFoundException('La ruta seleccionada no existe');
    }

    let stop: Stop | null = incidence.stop;

    if (data.stopId !== undefined) {
      if (data.stopId === null) {
        stop = null;
      } else {
        stop = await this.stopRepository.findOneBy({
          id: Number(data.stopId),
        });

        if (!stop) {
          throw new NotFoundException('La parada seleccionada no existe');
        }

        const routeStop = await this.routeStopRepository.findOne({
          where: {
            route: {id: route.id},
            stop: { id:stop.id},
          }
        })

        if(!RouteStop){
          throw new NotFoundException(
            'la parada seleccionada no pertenece a la ruta indicada'
          )
        }
      }
    } else if (stop) {
      const routeStop = await this.routeStopRepository.findOne({
        where:{
          route: {id: route.id},
          stop: {id: stop.id},
        },
      });

      if(!routeStop){
        throw new NotFoundException(
          'La parada actual no pertenece a la nueva ruta seleccionada'
        )
      }
    }

    Object.assign(incidence, {
      type: data.type ?? incidence.type,
      description: data.description ?? incidence.description,
      severity: data.severity ?? incidence.severity,
      isActive: data.isActive ?? incidence.isActive,
      route,
      stop,
    });

    return await this.incidenceRepository.save(incidence);
  }

  // Eliminar una incidencia
  async remove(id: number) {
    const incidence = await this.findOne(id);

    await this.incidenceRepository.remove(incidence);

    return { message: 'Incidencia eliminada correctamente' };
  }
}
