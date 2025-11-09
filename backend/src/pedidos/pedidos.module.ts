import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { PedidoItem } from './pedido-item.entity';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { AuthModule } from '../auth/auth.module';
import { ProductosModule } from '../productos/productos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, PedidoItem]),
    AuthModule,
    ProductosModule,
  ],
  providers: [PedidosService],
  controllers: [PedidosController],
})
export class PedidosModule {}