import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Route } from './entities/route.entity.js';

@Injectable()
export class RoutesService {
    constructor(
        @InjectRepository(Route)
        private routeRepository: Repository<Route>,
    ){}

    async create(data: Partial<Route>){
        const existingRoute = await this.routeRepository.findOneBy({
            code: data.code,
        })

        if(existingRoute){
            throw new ConflictException('El codigo de ruta ya existe');
        }

        const route = this.routeRepository.create(data);

        return await this.routeRepository.save(route);

    }

    async findAll(){
        return await this.routeRepository.find();
    }

    async findOne(id: number){
        const route = await this.routeRepository.findOneBy({id});

        if(!route){
            throw new NotFoundException('Ruta no encontrada');
        }

        return route;
    }

    async updtae(id: number, data: Partial<Route>){
        const route = await this.findOne(id);

        if(data.code && data.code !== route.code){
            const existingRoute = await this.routeRepository.findOneBy({
                code: data.code,
            });

            if(existingRoute){
                throw new ConflictException('El codigo de ruta ya existe');
            }
        }

        Object.assign(route, data);

        return await this,this.routeRepository.save(route);
    }

    async remove(id:number){
        const route = await this.findOne(id);

        await this.routeRepository.remove(route);

        return{
            message: 'Ruta eliminada correctamente'
        };
    }
}


