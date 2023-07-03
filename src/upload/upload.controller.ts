import {
  Controller,
  Post,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { parseFilePipe } from './util/image.filter';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile(parseFilePipe)
    file: Express.Multer.File,
  ) {
    return this.uploadService.create(file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(id);
  }
}
