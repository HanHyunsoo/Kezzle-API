import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { image } from '../../common/type/image.type';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Order } from '../../order/entities/order.schema';
import { User } from '../../user/entities/user.schema';

export type cakeDocument = Cake & Document;

@Schema({ timestamps: true, versionKey: false })
export class Cake {
  @Prop({ type: Object, required: true })
  image: image;

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
