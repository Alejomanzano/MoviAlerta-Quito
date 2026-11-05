import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StopsController } from './stops.controller.js';
import { StopsService } from './stops.service.js';
import { Stop } from './entities/stop.entity.js';
import { AuthModule } from '../auth/auth.module.js';
import { RoutesModule } from '../routes/routes.module.js';
import { Route } from '../routes/entities/route.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Stop, Route]), AuthModule, RoutesModule],
  controllers: [StopsController],
  providers: [StopsService]
})
export class StopsModule {}
