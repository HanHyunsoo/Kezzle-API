import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  create(file: Express.Multer.File) {
    return 'This action adds a new upload';
  }

  remove(id: string) {
    return `This action removes a #${id} upload`;
  }
}
