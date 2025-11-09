import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { PedidoItem } from './pedido-item.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clienteNombre: string;

  @Column()
  clienteEmail: string;

  @Column({ nullable: true })
  clienteTelefono: string;

  @Column()
  clienteDireccion: string;

  @Column('decimal', { precision: 12, scale: 2 })
  total: number;

  @Column({ default: 'pendiente' })
  estado: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => PedidoItem, item => item.pedido)
  items: PedidoItem[];
}