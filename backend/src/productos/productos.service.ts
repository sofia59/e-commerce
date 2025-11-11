import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';

@Injectable()
export class ProductosService {
  constructor(@InjectRepository(Producto) private productoRepo: Repository<Producto>) {}

  async onModuleInit() {
    const count = await this.productoRepo.count();
    if (count === 0) {
      const productos = [
        {
          nombre: 'Serum Facial Premium',
          descripcion: 'Serum hidratante con vitamina C',
          precio: 49.99,
          precioOriginal: 59.99,
          categoria: 'Serums',
          stock: 15,
          activo: 1,
        },
        {
          nombre: 'Crema Nocturna Regeneradora',
          descripcion: 'Crema anti-envejecimiento para la noche',
          precio: 65.0,
          precioOriginal: 85.0,
          categoria: 'Cremas',
          stock: 10,
          activo: 1,
        },
        {
          nombre: 'Gel Limpiador Suave',
          descripcion: 'Limpiador facial delicado',
          precio: 35.0,
          precioOriginal: 45.0,
          categoria: 'Limpiadores',
          stock: 20,
          activo: 1,
        },
        {
          nombre: 'Mascarilla Iluminadora',
          descripcion: 'Mascarilla con oro 24k',
          precio: 45.0,
          precioOriginal: 55.0,
          categoria: 'Mascarillas',
          stock: 8,
          activo: 1,
        },
        {
          nombre: 'Contorno de Ojos',
          descripcion: 'Crema específica para el contorno de ojos',
          precio: 55.0,
          precioOriginal: 70.0,
          categoria: 'Ojos',
          stock: 12,
          activo: 1,
        },
        {
          nombre: 'Protector Solar SPF 50',
          descripcion: 'Protección solar facial',
          precio: 40.0,
          precioOriginal: 50.0,
          categoria: 'Protección',
          stock: 25,
          activo: 1,
        },
      ];

      for (const prod of productos) {
        await this.productoRepo.save(prod);
      }
      console.log('✅ Productos de ejemplo creados');
    }
  }

  async obtenerTodos() {
    return this.productoRepo.find({ order: { createdAt: 'DESC' } });
  }

  async obtenerPorId(id: number) {
    return this.productoRepo.findOne({ where: { id } });
  }

  async crear(data: any) {
    return this.productoRepo.save(data);
  }

  async actualizar(id: number, data: any) {
    await this.productoRepo.update(id, data);
    return this.productoRepo.findOne({ where: { id } });
  }

  async eliminar(id: number) {
    await this.productoRepo.delete(id);
    return { message: 'Producto eliminado' };
  }

  async obtenerPublicos() {
    return this.productoRepo.find({ where: { activo: 1 } });
  }

  async obtenerPublicoPorId(id: number) {
    return this.productoRepo.findOne({ where: { id, activo: 1 } });
  }

  async validarStock(items: any[]) {
    const resultado: any = {
      valido: true,
      items: [],
    };

    for (const item of items) {
      const producto = await this.productoRepo.findOne({
        where: { id: item.productoId },
      });

      if (!producto) {
        resultado.valido = false;
        resultado.items.push({
          productoId: item.productoId,
          solicitado: item.cantidad,
          disponible: 0,
          mensaje: 'Producto no encontrado',
        });
        continue;
      }

      if (producto.stock < item.cantidad) {
        resultado.valido = false;
        resultado.items.push({
          productoId: item.productoId,
          nombre: producto.nombre,
          solicitado: item.cantidad,
          disponible: producto.stock,
          mensaje: `Solo hay ${producto.stock} disponibles`,
        });
      } else {
        resultado.items.push({
          productoId: item.productoId,
          nombre: producto.nombre,
          solicitado: item.cantidad,
          disponible: producto.stock,
          valido: true,
        });
      }
    }

    return resultado;
  }

  async descontarStock(items: any[]) {
    for (const item of items) {
      const producto = await this.productoRepo.findOne({
        where: { id: item.productoId },
      });
      if (producto) {
        await this.productoRepo.update(item.productoId, {
          stock: producto.stock - item.cantidad,
        });
      }
    }
  }
}