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

export const ConditionSchema = SchemaFactory.createForClass(Condition);

@Schema()
export class Validation {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  comparator: string;

  @Prop({ required: true })
  value: string;
}

export const ValidationSchema = SchemaFactory.createForClass(Validation);

@Schema()
export class ExternalData {
  @Prop({ required: true })
  formId: string;

  @Prop({ required: true })
  keyField: string;

  @Prop({ required: true })
  displayFields: string[];
}
export const ExternalDataSchema = SchemaFactory.createForClass(ExternalData);

@Schema()
export class Field {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: true })
  required: boolean;

  @Prop({ type: [ConditionSchema] })
  conditions: Condition[];

  @Prop()
  validation: Validation;

  @Prop()
  formula: string;

  @Prop()
  default: string;

  @Prop()
  guidance: string;

  @Prop()
  options: string[];

  @Prop()
  group: string;

  @Prop({ type: ExternalDataSchema })
  externalData: ExternalData;
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
  section: string;

  @Prop()
  type: string;

  @Prop()
  country: string;

  @Prop()
  header: string;

  @Prop()
  logo: string;

  @Prop({ type: [FieldSchema] })
  fields: Field[];

  @Prop({ default: 'Deployed' })
  status: string;

  @Prop()
  groups: string[];
}

export const FormSchema = SchemaFactory.createForClass(Form);
