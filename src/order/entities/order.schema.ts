import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Cake } from '../../cake/entities/cake.schema';
import { User } from '../../user/entities/user.schema';

export type orderDocument = Order & Document;

@Schema({ timestamps: true, versionKey: false })
export class Order {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Cake', required: true })
  cake: Cake;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  buyer: User;
}

const schema = SchemaFactory.createForClass(Order);
schema.plugin(mongoosePaginate);
export const orderSchema = schema;
