import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionImage } from './collection-image.entity';
import * as fs from 'fs';
import * as path from 'path';
import { Express } from 'express';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(CollectionImage)
    private collectionImageRepo: Repository<CollectionImage>,
  ) {}

  async uploadImage(category: string, file: any) {
    const existing = await this.collectionImageRepo.findOne({ where: { category } });

    const imageData = new CollectionImage();
    imageData.category = category;
    imageData.imageData = file.buffer;
    imageData.imageName = file.originalname;

    if (existing) {
      imageData.id = existing.id;
    }

    return this.collectionImageRepo.save(imageData);
  }

  async getImage(category: string) {
    return this.collectionImageRepo.findOne({ where: { category } });
  }

  async getAllImages() {
    return this.collectionImageRepo.find();
  }
}