import { Controller, Get, Put, Post, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RoutesService } from './routes.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CreateRouteDto } from './dto/create-route.dto.js';
import { UpdateRouteDto } from './dto/update-route.dto.js';

@Controller('routes')
@UseGuards(JwtAuthGuard)
export class RoutesController {

    constructor(private readonly routesService: RoutesService){}

    @Post()
    create(@Body()data: CreateRouteDto){
        return this.routesService.create(data);
    }

    @Get()
    findAll(){
        return this.routesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe)id: number){
        return this.routesService.findOne(id);
    }
    
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateRouteDto,
    ){
        return this.routesService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number){
        return this.routesService.remove(id);
    }
}
