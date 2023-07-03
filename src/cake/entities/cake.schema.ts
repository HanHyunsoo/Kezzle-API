import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Order } from '../../order/entities/order.schema';
import { User } from '../../user/entities/user.schema';
import { Image, ImageSchema } from '../../upload/entities/image.schema';

export type cakeDocument = Cake & Document;

@Schema({ timestamps: true, versionKey: false })
export class Cake {
  @Prop({ type: ImageSchema, required: true })
  image: Image;

  @Prop({ type: Array, required: true, default: [] })
  tags: string[];

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'Order',
    required: true,
    default: [],
  })
  orders: Order[];

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'User',
    required: true,
    default: [],
  })
  likeUsers: User[];
}

const schema = SchemaFactory.createForClass(Cake);
schema.plugin(mongoosePaginate);
export const cakeSchema = schema;
