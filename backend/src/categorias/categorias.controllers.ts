import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api')
export class CategoriasController {
  constructor(private categoriasService: CategoriasService) {}

  @Get('categorias')
  async obtenerTodas() {
    return this.categoriasService.obtenerTodas();
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin/categorias')
  async crear(@Body() data: any) {
    return this.categoriasService.crear(data);
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/categorias/:id')
  async actualizar(@Param('id') id: number, @Body() data: any) {
    return this.categoriasService.actualizar(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admin/categorias/:id')
  async eliminar(@Param('id') id: number) {
    return this.categoriasService.eliminar(id);
  }
}