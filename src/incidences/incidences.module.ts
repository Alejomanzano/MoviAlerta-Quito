import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IncidencesController } from './incidences.controller.js';
import { IncidencesService } from './incidences.service.js';
import { Incidence } from './entities/incidence.entity.js';

import { Route } from '../routes/entities/route.entity.js';
import { Stop } from '../stops/entities/stop.entity.js';

import { AuthModule } from '../auth/auth.module.js';
import { RoutesModule } from '../routes/routes.module.js';
import { StopsModule } from '../stops/stops.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Incidence, Route, Stop]),
    AuthModule,
    RoutesModule,
    StopsModule,
  ],
  controllers: [IncidencesController],
  providers: [IncidencesService],
})
export class IncidencesModule {}