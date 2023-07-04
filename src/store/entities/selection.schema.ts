import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Selection {
  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String })
  subdescription?: string;

  @Prop({ type: Number, required: true, default: 0 })
  price: number;
}

export const SelectionSchema = SchemaFactory.createForClass(Selection);
