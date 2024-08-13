import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Submission } from './schemas/submission.schema';
import { Model } from 'mongoose';
import { CreateSubmissionDto } from './dto/create-submission.dto';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel(Submission.name) private submissionModel: Model<Submission>,
  ) {}

  async create(createSubmissionDto: CreateSubmissionDto | Record<string, any>) {
    const createdSubmission = new this.submissionModel(createSubmissionDto);
    return createdSubmission.save();
  }

  async findAll() {
    return this.submissionModel.find().exec();
  }

  async findSubmissionsByFormId(formId: string) {
    return this.submissionModel.find({ formId }).exec();
  }
}
