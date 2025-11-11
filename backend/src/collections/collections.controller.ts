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
import { ConfigService } from '@nestjs/config';
import { memoryStorage } from 'multer';
import { CollectionsService } from './collections.service';
import { Response } from 'express';

@Controller('api/config')
export class CollectionsController {
  constructor(
    private collectionsService: CollectionsService,
    private configService: ConfigService,
  ) {}

  @Post('colecciones')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      storage: memoryStorage(),
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
    if (!files || files.length === 0) {
      throw new BadRequestException('No se adjuntaron archivos');
    }

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

  @Get('colecciones')
  async getAllImages(@Res() res: Response) {
    const images = await this.collectionsService.getAllImages();
    const apiUrl = this.configService.get<string>('API_URL') || 'http://localhost:3000/api';

    const response = images.map(img => ({
      category: img.category,
      imageName: img.imageName,
      imageUrl: `${apiUrl}/config/colecciones/${img.category}`,
    }));

    res.json(response);
  }

  @Get('colecciones/:category')
  async getImage(@Param('category') category: string, @Res() res: Response) {
    const image = await this.collectionsService.getImage(category);
    if (!image) {
      throw new BadRequestException('Imagen no encontrada');
    }

    res.set('Content-Type', 'image/jpeg');
    res.send(image.imageData);
  }
}