import { ApiProperty } from '@nestjs/swagger';

export class ImageResponseDto {
  @ApiProperty({
    description: '파일 업로드할 때 원래 파일명',
    example: '1.png',
  })
  readonly originalName: string;

  @ApiProperty({
    description: '파일 업로드 완료 후 바뀐 파일명',
    example: '41f1904d-cb2e-45f3-b5ee-072bc49cba11.png',
  })
  readonly convertedName: string;

  @ApiProperty({
    description: 'S3에 저장된 파일 URL',
    example:
      'https://example-bucket.s3.region.amazonaws.com/test/41f1904d-cb2e-45f3-b5ee-072bc49cba11.png',
  })
  readonly s3Url: string;

  constructor(jsonData: any) {
    this.originalName = jsonData.originalName;
    this.convertedName = jsonData.convertedName;
    this.s3Url = jsonData.s3Url;
  }
}
