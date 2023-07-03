import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { image } from 'src/upload/type/image.type';

export class CreateCakeDto {
  @IsOptional()
  @IsObject()
  @ApiProperty({
    description: '케이크에 관련된 이미지',
    example: {
      originalName: '1.png',
      convertedName: '41f1904d-cb2e-45f3-b5ee-072bc49cba11.png',
      s3Url:
        'https://example-bucket.s3.region.amazonaws.com/test/41f1904d-cb2e-45f3-b5ee-072bc49cba11.png',
    },
    required: true,
  })
  readonly image: image;

  @IsString({ each: true })
  @ApiProperty({
    description: '케이크에 관련한 태그들',
    example: ['크리스마스', '딸기'],
    required: true,
  })
  readonly tags: string[];
}
