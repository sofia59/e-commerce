import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { PedidoItem } from './pedido-item.entity';
import { ProductosService } from '../productos/productos.service';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido) private pedidoRepo: Repository<Pedido>,
    @InjectRepository(PedidoItem) private itemRepo: Repository<PedidoItem>,
    private productosService: ProductosService,
  ) {}

  async obtenerTodos() {
    return this.pedidoRepo.find({
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }

  async obtenerPorId(id: number) {
    return this.pedidoRepo.findOne({
      where: { id },
      relations: ['items'],
    });
  }

  async obtenerPorIdYEmail(id: number, email: string) {
    const pedido = await this.pedidoRepo.findOne({
      where: { id, clienteEmail: email },
      relations: ['items'],
    });

    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado o email no coincide');
    }

    return pedido;
  }

  async actualizarEstado(id: number, estado: string) {
    await this.pedidoRepo.update(id, { estado });
    return this.pedidoRepo.findOne({ where: { id } });
  }

  async crear(data: any) {
    let total = 0;

    for (const item of data.items) {
      const producto = await this.productosService.obtenerPorId(item.productoId);
      if (!producto) {
        throw new Error(`Producto ${item.productoId} no encontrado`);
      }
      total += producto.precio * item.cantidad;
    }

    const pedido = await this.pedidoRepo.save({
      clienteNombre: data.clienteNombre,
      clienteEmail: data.clienteEmail,
      clienteTelefono: data.clienteTelefono,
      clienteDireccion: data.clienteDireccion,
      total,
      estado: 'pendiente',
    });

    for (const item of data.items) {
      const producto = await this.productosService.obtenerPorId(item.productoId);
      if (!producto) {
        throw new Error(`Producto ${item.productoId} no encontrado`);
      }
      await this.itemRepo.save({
        pedido,
        productoId: item.productoId,
        cantidad: item.cantidad,
        precioUnitario: producto.precio,
      });
    }

    return { pedidoId: pedido.id, total, estado: 'pendiente' };
  }
}