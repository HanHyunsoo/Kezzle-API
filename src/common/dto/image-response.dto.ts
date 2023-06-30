import { ApiProperty } from '@nestjs/swagger';

export class ImageResponseDto {
  @ApiProperty({ description: '파일 업로드할 때 원래 파일명' })
  readonly originalName: string;
  @ApiProperty({ description: '파일 업로드 완료 후 바뀐 파일명' })
  readonly convertedName: string;
  @ApiProperty({ description: 'S3에 저장된 파일 URL' })
  readonly s3Url: string;

  constructor(jsonData: any) {
    this.originalName = jsonData.originalName;
    this.convertedName = jsonData.convertedName;
    this.s3Url = jsonData.s3Url;
  }
}
