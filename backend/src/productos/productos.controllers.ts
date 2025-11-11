import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api')
export class ProductosController {
  constructor(private productosService: ProductosService) {}

  @UseGuards(JwtAuthGuard)
  @Get('admin/productos')
  async obtenerTodos() {
    return this.productosService.obtenerTodos();
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/productos/:id')
  async obtenerPorId(@Param('id') id: number) {
    return this.productosService.obtenerPorId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin/productos')
  async crear(@Body() data: any) {
    return this.productosService.crear(data);
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/productos/:id')
  async actualizar(@Param('id') id: number, @Body() data: any) {
    return this.productosService.actualizar(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admin/productos/:id')
  async eliminar(@Param('id') id: number) {
    return this.productosService.eliminar(id);
  }

  @Get('productos')
  async obtenerPublicos() {
    return this.productosService.obtenerPublicos();
  }

  @Get('productos/:id')
  async obtenerPublicoPorId(@Param('id') id: number) {
    return this.productosService.obtenerPublicoPorId(id);
  }

  @Post('productos/validar-stock')
  async validarStock(@Body() body: { items: any[] }) {
    return this.productosService.validarStock(body.items);
  }
}