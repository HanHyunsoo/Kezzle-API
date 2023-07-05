import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Selection, SelectionSchema } from './selection.schema';
import { OrderFormType } from '../enum/order-form.enum';

@Schema({ _id: false })
export class OrderForm {
  @Prop({
    type: String,
    enum: OrderFormType,
    required: true,
  })
  type: OrderFormType;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  subTitle?: string;

  @Prop({ type: [SelectionSchema], required: true, default: [] })
  selections: Selection[];
}

export const OrderFormSchema = SchemaFactory.createForClass(OrderForm);
