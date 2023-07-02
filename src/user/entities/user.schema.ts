import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Order } from '../../order/entities/order.schema';
import { Cake } from '../../cake/entities/cake.schema';
import { Store } from '../../store/entities/store.schema';

export type userDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'Order',
    required: true,
    default: [],
  })
  orders: Order[];

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'Cake',
    required: true,
    default: [],
  })
  likeCakes: Cake[];

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'Store',
    required: true,
    default: [],
  })
  likeStores: Store[];
}

const schema = SchemaFactory.createForClass(User);
schema.plugin(mongoosePaginate);
export const userSchema = schema;
