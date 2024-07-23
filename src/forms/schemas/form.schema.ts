import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FormDocument = HydratedDocument<Form>;

@Schema()
export class Condition {
  @Prop({ required: true })
  field: string;

  @Prop({ required: true })
  comparator: string;

  @Prop({ required: true })
  value: string;
}

export const ConditionSchema = SchemaFactory.createForClass(Condition)

@Schema()
export class Validation {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  comparator: string;

  @Prop({ required: true })
  value: string;
}

export const ValidationSchema = SchemaFactory.createForClass(Validation)

@Schema()
export class Field {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: true })
  required: boolean;

  @Prop({type: [ConditionSchema]})
  conditions: Condition[];

  @Prop()
  validation: Validation;
}


export const FieldSchema = SchemaFactory.createForClass(Field);

@Schema({ timestamps: true })
export class Form {
  @Prop({ default: '1.0' })
  version: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop({ type: [FieldSchema] })
  fields: Field[];
}

export const FormSchema = SchemaFactory.createForClass(Form);
