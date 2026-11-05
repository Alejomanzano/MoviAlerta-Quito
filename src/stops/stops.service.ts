
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Stop } from './entities/stop.entity.js';
import { Route } from '../routes/entities/route.entity.js';

@Injectable()
export class StopsService {
  constructor(
    @InjectRepository(Stop)
    private stopRepository: Repository<Stop>,

    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
  ) {}

  // Crear una parada
  async create(data: any) {
    const route = await this.routeRepository.findOneBy({
      id: Number(data.routeId),
    });

    if (!route) {
      throw new NotFoundException('La ruta seleccionada no existe');
    }

    const stop = this.stopRepository.create({
      name: data.name,
      address: data.address,
      description: data.description,
      isActive: data.isActive ?? true,
      route,
    });

    return await this.stopRepository.save(stop);
  }

  // Consultar todas las paradas
  async findAll() {
    return await this.stopRepository.find({
      relations: {
        route:true,
      },
    });
  }

  // Consultar una parada por ID
  async findOne(id: number) {
    const stop = await this.stopRepository.findOne({
      where: { id },
      relations: {
        route: true,
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

    if (data.routeId !== undefined) {
      const route = await this.routeRepository.findOneBy({
        id: Number(data.routeId),
      });

      if (!route) {
        throw new NotFoundException('La ruta seleccionada no existe');
      }

      stop.route = route;
    }

    Object.assign(stop, {
      name: data.name ?? stop.name,
      address: data.address ?? stop.address,
      description: data.description ?? stop.description,
      isActive: data.isActive ?? stop.isActive,
    });

    return await this.stopRepository.save(stop);
  }

  // Eliminar una parada
  async remove(id: number) {
    const stop = await this.findOne(id);

    await this.stopRepository.remove(stop);

    return { message: 'Parada eliminada correctamente' };
  }
}
