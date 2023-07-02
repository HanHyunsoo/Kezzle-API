import { IsObject, IsString } from 'class-validator';
import { image } from '../../upload/type/image.type';

export class CreateCakeDto {
  @IsObject()
  readonly image: image;

  @IsString({ each: true })
  readonly tags: string[];
}
