import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Project } from 'src/project/schemas/project.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'Admin' })
  role: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  status: string;

  @Prop()
  description: string;

  // Foreign key reference to the Project model
  @Prop({ type: Types.ObjectId, ref: 'Project'})
  project: Project;
}

export const UserSchema = SchemaFactory.createForClass(User);
