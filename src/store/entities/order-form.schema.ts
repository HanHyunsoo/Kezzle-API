import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Selection, SelectionSchema } from './selection.schema';

@Schema()
export class OrderForm {
  @Prop({
    type: String,
    enum: ['RADIO', 'CHECKBOX', 'TEXTFILED'],
    required: true,
  })
  type: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  subTitle: string;

  @Prop({ type: [SelectionSchema], required: true, default: [] })
  selections: Selection[];
}

export const OrderFormSchema = SchemaFactory.createForClass(OrderForm);
