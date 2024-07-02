import { HttpException } from '../exceptions/HttpException';
import { SubmissionModel } from '@/models/submissions.model';

export const createSubmission = async submissionData => {
  const createdSubmission = await SubmissionModel.create(submissionData);
  return createdSubmission;
};

export const updateSubmission = async (submissionId: string, submissionData) => {
  const updatedSubmission = await SubmissionModel.findByIdAndUpdate(submissionId, submissionData, { new: true });
  if (!updatedSubmission) {
    throw new HttpException(409, `Submission ${submissionId} doesn't exist`);
  }
  return updatedSubmission;
};

export const getSubmissions = async () => {
  return await SubmissionModel.find();
};
