import { Injectable, Inject } from '@nestjs/common';
import { v2 as Cloudinary, UploadApiResponse } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  constructor(@Inject('CLOUDINARY') private cloudinary: typeof Cloudinary) {}

 uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const upload = this.cloudinary.uploader.upload_stream(
            { folder: 'peliculas' },
            (error, result) => {
                if (error) return reject(error);
                if (!result) return reject(new Error('No se recibió respuesta de Cloudinary'));
                resolve(result);
            },
            );
            toStream(file.buffer).pipe(upload);
        });
    }
}
