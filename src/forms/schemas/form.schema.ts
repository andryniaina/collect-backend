import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FormDocument = HydratedDocument<Form>;

@Schema()
export class Field {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  name: string;
}

export const FieldSchema = SchemaFactory.createForClass(Field);

@Schema({ timestamps: true })
export class Form {
  @Prop({ default: '1.0' })
  version: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [FieldSchema], required: true })
  fields: Field[];
}

export const FormSchema = SchemaFactory.createForClass(Form);
