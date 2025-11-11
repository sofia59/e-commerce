import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PedidosService } from './pedidos.service';

@Controller('api/pedidos')
export class PedidosController {
  constructor(private pedidosService: PedidosService) {}

  @Get('public/:id')
  async obtenerPorIdPublico(
    @Param('id') id: number,
    @Query('email') email?: string,
  ) {
    if (email) {
      return this.pedidosService.obtenerPorIdYEmail(id, email);
    }
    return this.pedidosService.obtenerPorId(id);
  }

  @Post()
  async crearPedido(@Body() data: any) {
    return this.pedidosService.crear(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async obtenerTodos() {
    return this.pedidosService.obtenerTodos();
  }

  @Get('admin/:id')
  @UseGuards(JwtAuthGuard)
  async obtenerPorIdAdmin(@Param('id') id: number) {
    return this.pedidosService.obtenerPorId(id);
  }

  @Put('admin/:id')
  @UseGuards(JwtAuthGuard)
  async actualizarEstado(
    @Param('id') id: number,
    @Body() data: { estado: string },
  ) {
    return this.pedidosService.actualizarEstado(id, data.estado);
  }
}