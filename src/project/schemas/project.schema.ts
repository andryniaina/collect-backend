import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Form } from 'src/forms/schemas/form.schema';
import { User } from 'src/users/schemas/user.schema';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  endDate: Date;

  @Prop()
  region: string;

  @Prop()
  priority: string;

  @Prop()
  section: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  responsable: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  agents: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Form' }] })
  forms: Form[];

  @Prop({ default: 'En cours' })
  status: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
