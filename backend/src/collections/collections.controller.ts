import {
  Controller,
  Post,
  Get,
  Param,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CollectionsService } from './collections.service';
import { Response } from 'express';

@Controller('collections')
export class CollectionsController {
  constructor(private collectionsService: CollectionsService) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          cb(new BadRequestException('Solo se permiten imágenes'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  async uploadImages(@UploadedFiles() files: any[]) {
    const categories = ['maquillajes', 'perfumes', 'accesorios'];
    const results: any[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const category = categories[i];
      if (category) {
        const result = await this.collectionsService.uploadImage(category, file);
        results.push(result);
      }
    }

    return { message: 'Imágenes subidas exitosamente', data: results };
  }

  @Get('images/:category')
  async getImage(@Param('category') category: string, @Res() res: Response) {
    const image = await this.collectionsService.getImage(category);
    if (!image) {
      throw new BadRequestException('Imagen no encontrada');
    }

    res.set('Content-Type', 'image/jpeg');
    res.send(image.imageData);
  }

  @Get('images')
  async getAllImages(@Res() res: Response) {
    const images = await this.collectionsService.getAllImages();
    
    const response = images.map(img => ({
      category: img.category,
      imageName: img.imageName,
      imageUrl: `http://localhost:3000/collections/images/${img.category}`
    }));

    res.json(response);
  }
}