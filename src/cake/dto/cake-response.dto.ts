import { ApiProperty } from '@nestjs/swagger';
import { ImageResponseDto } from '../../upload/dto/image-response.dto';

export class CakeResponseDto {
  @ApiProperty({ description: 'id' })
  readonly id: string;
  @ApiProperty({ description: 'image' })
  readonly image: ImageResponseDto;
  @ApiProperty({ description: 'tags' })
  readonly tags: string[];
  @ApiProperty({ description: 'createdAt' })
  readonly createdAt: Date;
  @ApiProperty({ description: 'updatedAt' })
  readonly updatedAt: Date;

  constructor(jsonData: any) {
    this.id = jsonData._id;
    this.image = new ImageResponseDto(jsonData.image);
    this.tags = jsonData.tags;
    this.createdAt = jsonData.createdAt;
    this.updatedAt = jsonData.updatedAt;
  }
}
