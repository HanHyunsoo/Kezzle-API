/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Post,
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
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateImageDto } from './dto/create-image.dto';

// TODO: 인증/인가 권한 추가하기
@Controller('uploads')
@ApiTags('uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: '이미지 업로드',
    description:
      '이미지를 업로드합니다. 원래 이름 대신 uuid로 저장됩니다.' +
      '\n\n' +
      '권한이 필요하지 않습니다.',
  })
  @ApiCreatedResponse({
    description: '이미지 업로드 성공',
    type: ImageResponseDto,
  })
  @ApiBadRequestResponse({
    description: '이미지 업로드에서 문제가 생김(용량, 파일 형식)',
  })
  async create(
    @UploadedFile(parseFilePipe)
    file: Express.Multer.File,
    @Body()
    createImageDto: CreateImageDto,
  ): Promise<ImageResponseDto> {
    return this.uploadService.create('test', file);
  }

  @Delete()
  @ApiOperation({
    summary: '이미지 삭제',
    description:
      'S3 객체 URL을 이용해서 이미지를 삭제합니다.' +
      '\n\n' +
      'Admin 권한이 필요합니다.',
  })
  @ApiOkResponse({
    description: '이미지 삭제 성공',
  })
  remove(@Body() deleteImageDto: DeleteImageDto): Promise<void> {
    return this.uploadService.remove(deleteImageDto.s3Url);
  }
}
