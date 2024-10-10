import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type GroupDocument = HydratedDocument<Group>;

@Schema()
export class Group {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: [Types.ObjectId], ref: 'User', required: false })
  forms: Types.ObjectId[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
