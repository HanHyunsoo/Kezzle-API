import { image } from '../../common/type/image.type';

export class CakeResponseDto {
  readonly id: string;
  readonly image: image;
  readonly tags: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(jsonData: any) {
    this.id = jsonData._id;
    this.image = jsonData.image;
    this.tags = jsonData.tags;
    this.createdAt = jsonData.createdAt;
    this.updatedAt = jsonData.updatedAt;
  }
}
