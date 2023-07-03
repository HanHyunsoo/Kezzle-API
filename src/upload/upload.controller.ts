import {
  Controller,
  Post,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { parseFilePipe } from './util/image.filter';
import { ImageResponseDto } from './dto/image-response.dto';
import { DeleteImageDto } from './dto/delete-image.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile(parseFilePipe)
    file: Express.Multer.File,
  ): Promise<ImageResponseDto> {
    return this.uploadService.create('test', file);
  }

  @Delete()
  remove(@Body() deleteImageDto: DeleteImageDto): Promise<void> {
    return this.uploadService.remove(deleteImageDto.s3Url);
  }
}
