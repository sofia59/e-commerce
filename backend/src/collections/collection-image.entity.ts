import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('collection_images')
export class CollectionImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  category: string; // maquillajes, perfumes, accesorios

  @Column({ type: 'longblob', nullable: true })
  imageData: Buffer; // Almacena la imagen como bytes

  @Column({ nullable: true })
  imageName: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}