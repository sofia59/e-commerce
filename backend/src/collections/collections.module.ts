import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionImage } from './collection-image.entity';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionImage])],
  controllers: [CollectionsController],
  providers: [CollectionsService],
})
export class CollectionsModule {}