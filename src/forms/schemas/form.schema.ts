import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Project } from 'src/project/schemas/project.schema';

export type FormDocument = Form & Document;

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
  title: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: true })
  required: boolean;

  @Prop({ type: [ConditionSchema] })
  conditions: Condition[];

  @Prop()
  validations: Validation[];

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
  _id: Types.ObjectId;

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

  @Prop({ type: [FieldSchema] })
  fields: Field[];

  @Prop({ default: 'Deployed' })
  status: string;

  @Prop()
  groups: string[];

  @Prop({ type: Types.ObjectId, ref: 'Project'})
  project: Project;

  createdAt?: Date;
  updatedAt?: Date;
}

export const FormSchema = SchemaFactory.createForClass(Form);
