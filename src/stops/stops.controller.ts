
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

import { StopsService } from './stops.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('stops')
@UseGuards(JwtAuthGuard)
export class StopsController {
  constructor(private readonly stopsService: StopsService) {}

  // Crear una parada
  @Post()
  create(@Body() data: any) {
    return this.stopsService.create(data);
  }

  // Consultar todas las paradas
  @Get()
  findAll() {
    return this.stopsService.findAll();
  }

  // Consultar una parada por ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.stopsService.findOne(id);
  }

  // Actualizar una parada
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: any,
  ) {
    return this.stopsService.update(id, data);
  }

  // Eliminar una parada
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.stopsService.remove(id);
  }
}
