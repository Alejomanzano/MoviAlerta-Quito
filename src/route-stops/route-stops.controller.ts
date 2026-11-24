import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { RouteStopsService } from './route-stops.service.js';
@Controller('route-stops')
@UseGuards(JwtAuthGuard)
export class RouteStopsController {

    constructor(
        private readonly routeStopsService: RouteStopsService,
    ){}

    @Post()
    create(
        @Body('routeid', ParseIntPipe) routeId: number,
        @Body('stopid', ParseIntPipe) stopId: number,
        @Body('sequence', ParseIntPipe) sequence: number,
        
    ){
        return this.routeStopsService.create(
            routeId,
            stopId,
            sequence,
        );
    }

    @Get('route/:routeId')
    findByRoute(
        @Param('routeId', ParseIntPipe) routeId: number,
    ){
        return this.routeStopsService.findByRoute(routeId);
    }
}
