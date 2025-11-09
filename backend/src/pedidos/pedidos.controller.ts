import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api')
export class PedidosController {
  constructor(private pedidosService: PedidosService) {}

  @UseGuards(JwtAuthGuard)
  @Get('admin/pedidos')
  async obtenerTodos() {
    return this.pedidosService.obtenerTodos();
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/pedidos/:id')
  async obtenerPorId(@Param('id') id: number) {
    return this.pedidosService.obtenerPorId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/pedidos/:id')
  async actualizarEstado(@Param('id') id: number, @Body() body: { estado: string }) {
    return this.pedidosService.actualizarEstado(id, body.estado);
  }

  @Post('pedidos')
  async crear(@Body() data: any) {
    return this.pedidosService.crear(data);
  }
}