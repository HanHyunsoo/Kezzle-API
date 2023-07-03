import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Order } from '../../order/entities/order.schema';
import { User } from '../../user/entities/user.schema';
import { OrderForm, OrderFormSchema } from './order-form.schema';
import { Location, LocationSchema } from './location.schema';
import { Image, ImageSchema } from '../../upload/entities/image.schema';

export type storeDocument = Store & Document;

@Schema({ timestamps: true, versionKey: false })
export class Store {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  listViewDescription: string;

  @Prop({ type: String })
  detailDescription: string;

  @Prop({ type: String })
  tabViewDescription: string;

  @Prop({ type: String })
  instagramUrl: string;

  @Prop({ type: String })
  kakaoUrl: string;

  @Prop({ type: ImageSchema })
  logo: Image;

  @Prop({ type: [ImageSchema], required: true, default: [] })
  detailImages: Image[];

  @Prop({ type: String })
  phoneNumber: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: LocationSchema, required: true })
  location: Location;

  @Prop({ type: String, required: true })
  businessNumber: string;

  @Prop({ type: [OrderFormSchema], required: true })
  orderForms: OrderForm[];

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

const schema = SchemaFactory.createForClass(Store).index({
  location: '2dsphere',
});
schema.plugin(mongoosePaginate);
export const storeSchema = schema;
