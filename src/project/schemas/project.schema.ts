import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Form } from 'src/forms/schemas/form.schema';
import { User } from 'src/users/schemas/user.schema';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  agents: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Form' }] })
  forms: Form[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
