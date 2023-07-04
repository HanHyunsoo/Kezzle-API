import { ApiProperty } from '@nestjs/swagger';
import { ImageResponseDto } from '../../upload/dto/image-response.dto';

export class CakeResponseDto {
  @ApiProperty({
    description: '케이크 ID(ObjectId)',
    example: '60b4d1b3e6b0b3001b9b9b9b',
  })
  readonly id: string;

  @ApiProperty({ type: ImageResponseDto, description: 'image' })
  readonly image: ImageResponseDto;

  @ApiProperty({ description: 'tags', example: ['크리스마스', '딸기'] })
  readonly tags: string[];

  @ApiProperty({ description: 'createdAt', example: '2021-06-01T00:00:00Z' })
  readonly createdAt: Date;

  @ApiProperty({ description: 'updatedAt', example: '2021-06-01T00:00:00Z' })
  readonly updatedAt: Date;

  constructor(jsonData: any) {
    this.id = jsonData._id;
    this.image = new ImageResponseDto(jsonData.image);
    this.tags = jsonData.tags;
    this.createdAt = jsonData.createdAt;
    this.updatedAt = jsonData.updatedAt;
  }
}
