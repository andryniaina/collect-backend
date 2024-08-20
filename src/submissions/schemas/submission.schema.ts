import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SubmissionDocument = HydratedDocument<Submission>;

@Schema({ timestamps: true })
export class Submission {
  @Prop({ required: true })
  _id: string;

  @Prop({ type: Types.ObjectId, ref: 'Form', required: true })
  formId: Types.ObjectId;

  @Prop({type: Object, required: true })
  data: Record<string, any>;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
