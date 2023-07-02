import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Order } from '../../order/entities/order.schema';
import { User } from '../../user/entities/user.schema';

export type storeDocument = Store & Document;

@Schema({ timestamps: true, versionKey: false })
export class Store {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'User',
    required: true,
    default: [],
  })
  likeUsers: User[];

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'Order',
    required: true,
    default: [],
  })
  orders: Order[];
}

const schema = SchemaFactory.createForClass(Store);
schema.plugin(mongoosePaginate);
export const storeSchema = schema;
