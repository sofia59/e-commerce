import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Producto } from '../productos/producto.entity';
import { Pedido } from '../pedidos/pedido.entity';
import { PedidoItem } from '../pedidos/pedido-item.entity';
import { Admin } from '../auth/admin.entity';
import { Categoria } from '../categorias/categoria.entity';
import { CollectionImage } from '../collections/collection-image.entity';

export const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_DATABASE || 'e_commerce',
  entities: [Producto, Pedido, PedidoItem, Admin, Categoria, CollectionImage],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
});
