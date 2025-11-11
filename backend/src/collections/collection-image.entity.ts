import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('collection_images')
export class CollectionImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  category: string;

  @Column({ type: 'longblob', nullable: true })
  imageData: Buffer; 

  @Column({ nullable: true })
  imageName: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}