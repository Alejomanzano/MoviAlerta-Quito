import { Module } from '@nestjs/common';
import { RouteStopsService } from './route-stops.service.js';
import { RouteStopsController } from './route-stops.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteStop } from './entities/route-stop.entity.js';
import { Stop } from '../stops/entities/stop.entity.js';
import { Route } from '../routes/entities/route.entity.js';
import { AuthModule } from '../auth/auth.module.js';



@Module({
  imports:[TypeOrmModule.forFeature([RouteStop, Route, Stop]),AuthModule,],
  providers: [RouteStopsService],
  controllers: [RouteStopsController],
  exports: [TypeOrmModule]
})
export class RouteStopsModule {}
