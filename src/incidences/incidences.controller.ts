
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { IncidencesService } from './incidences.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('incidences')
@UseGuards(JwtAuthGuard)
export class IncidencesController {
  constructor(
    private readonly incidencesService: IncidencesService,
  ) {}

  // Crear una incidencia
  @Post()
  create(@Body() data: any) {
    return this.incidencesService.create(data);
  }

  // Consultar todas las incidencias
  @Get()
  findAll() {
    return this.incidencesService.findAll();
  }

  // Consultar una incidencia por ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.incidencesService.findOne(id);
  }

  // Actualizar una incidencia
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: any,
  ) {
    return this.incidencesService.update(id, data);
  }

  // Eliminar una incidencia
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.incidencesService.remove(id);
  }
}
