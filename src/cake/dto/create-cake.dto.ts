import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { ImageResponseDto } from '../../upload/dto/image-response.dto';
import { Type } from 'class-transformer';

export class CreateCakeDto {
  @IsOptional()
  @Type(() => ImageResponseDto)
  @ValidateNested()
  @ApiProperty({
    type: ImageResponseDto,
    description: '케이크에 관련된 이미지',
    required: true,
  })
  readonly image: ImageResponseDto;

  @IsString({ each: true })
  @ApiProperty({
    description: '케이크에 관련한 태그들',
    example: ['크리스마스', '딸기'],
    required: true,
  })
  readonly tags: string[];
}
