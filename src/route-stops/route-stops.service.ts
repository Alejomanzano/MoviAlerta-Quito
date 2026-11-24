import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RouteStop } from './entities/route-stop.entity.js';
import { Repository } from 'typeorm';

import { Route } from '../routes/entities/route.entity.js';
import { Stop } from '../stops/entities/stop.entity.js';

@Injectable()
export class RouteStopsService {

    constructor(
        @InjectRepository(RouteStop)
        private readonly routeStopRepository: Repository<RouteStop>,

        @InjectRepository(Route)
        private readonly routeRepository: Repository<Route>,

        @InjectRepository(Stop)
        private readonly stopRepository: Repository<Stop>,
    ){}

    async create(routeid: number, stopId: number, sequence:number){
        if(!Number.isInteger(sequence) || sequence <1){
            throw new BadRequestException(
                'La secuencia debe ser un numero entero mayor a cero'
            );
        }

        const route = await this.routeRepository.findOneBy({
            id:routeid,
        });

        if(!route){
            throw new NotFoundException('la ruta no existe');
        }

        const stop = await this.stopRepository.findOneBy({
            id: stopId,
        });

        if(!stop){
            throw new NotFoundException('la parada no existe');
        }

        const existingSequence = await this.routeStopRepository.findOne({
            where: {
                route: { id: routeid},
                sequence,
            },
        });

        if(existingSequence){
            throw new ConflictException(
                'Ya existe una parada en esta posicion de la ruta'
            );
        }

        const existingStop = await this.routeStopRepository.findOne({
            where: {
                route: {id: routeid},
                stop: {id:stopId},
            },
        });

        if(existingStop){
            throw new ConflictException(
                'la parada ya esta asociada a la ruta',
            );
        }

        const routeStop = this.routeStopRepository.create({
            route,
            stop,
            sequence,
        });

        return await this.routeStopRepository.save(routeStop);
    }

    async findByRoute(routeid: number){
        const route = await this.routeRepository.findOneBy({
            id: routeid,
        });

        if(!route){
            throw new NotFoundException('la ruta no existe');
        }

        return await this.routeStopRepository.find({
            where:{
                route: { id: routeid}
            },
            relations: {
                stop: true,
            },

            order: {
                sequence: 'ASC',
            },
        });
    }
}
