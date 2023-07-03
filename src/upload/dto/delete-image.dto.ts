import { ApiProperty } from '@nestjs/swagger';

export class DeleteImageDto {
  @ApiProperty({
    description: '삭제할 S3 객체 URL',
    example: 'https://example-bucket.s3.region.amazonaws.com/test/1.png',
  })
  readonly s3Url: string;
}
