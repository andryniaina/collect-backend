import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type SubmissionDocument = Submission & Document;

@Schema({ timestamps: true })
export class Submission {
  @Prop({ required: true, type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  formId: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  submittedBy: User;

  @Prop({ type: Object, required: true })
  data: Record<string, any>;

  @Prop({ default: 'Draft' })
  status: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
