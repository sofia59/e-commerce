import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Producto } from '../productos/producto.entity';
import { Pedido } from '../pedidos/pedido.entity';
import { PedidoItem } from '../pedidos/pedido-item.entity';
import { Admin } from '../auth/admin.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'e_commerce',
  entities: [Producto, Pedido, PedidoItem, Admin],
  synchronize: true,
  logging: false,
};