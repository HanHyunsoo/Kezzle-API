import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Image {
  @Prop({ type: String, required: true })
  originalName: string;

  @Prop({ type: String, required: true })
  convertedName: string;

  @Prop({ type: String, required: true })
  s3Url: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
