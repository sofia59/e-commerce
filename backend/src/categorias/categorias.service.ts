import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>,
  ) {}

  async obtenerTodas() {
    return this.categoriaRepo.find();
  }

  async obtenerPorId(id: number) {
    return this.categoriaRepo.findOne({ where: { id } });
  }

  async crear(data: any) {
    return this.categoriaRepo.save(data);
  }

  async actualizar(id: number, data: any) {
    await this.categoriaRepo.update(id, data);
    return this.obtenerPorId(id);
  }

  async eliminar(id: number) {
    return this.categoriaRepo.delete(id);
  }
}