import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '../project/schemas/project.schema';
import { Form, FormSchema } from '../forms/schemas/form.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Submission, SubmissionSchema } from '../submissions/schemas/submission.schema';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Form.name, schema: FormSchema },
      { name: User.name, schema: UserSchema },
      { name: Submission.name, schema: SubmissionSchema },
    ]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {} 