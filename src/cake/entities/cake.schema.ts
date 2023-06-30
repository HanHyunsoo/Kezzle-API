import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { image } from '../../common/type/image.type';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type cakeDocument = Cake & Document;

@Schema({ timestamps: true, versionKey: false })
export class Cake {
  @Prop({ type: Object, required: true })
  image: image;

  @Prop({ type: Array, required: true, default: [] })
  tags: string[];
}

const schema = SchemaFactory.createForClass(Cake);
schema.plugin(mongoosePaginate);
export const cakeSchema = schema;
