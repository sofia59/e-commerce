import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  precioOriginal: number;

  @Column({ nullable: true })
  categoria: string;

  @Column({ default: 0 })
  stock: number;

  @Column({ default: 1 })
  activo: number;

  @Column({ nullable: true })
  imagen: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}