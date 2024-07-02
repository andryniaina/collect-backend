import * as SubmissionService from '@services/submissions.service';
import { NextFunction, Request, Response } from 'express';

export const createSubmission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdSubmission = await SubmissionService.createSubmission(req.body);
    res.status(201).json(createdSubmission);
  } catch (error) {
    next(error);
  }
};

export const updatedSubmission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: submissionId } = req.params;
    const updatedSubmission = await SubmissionService.updateSubmission(submissionId, req.body);
    res.status(200).json(updatedSubmission);
  } catch (error) {
    next(error);
  }
};

export const getSubmissions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const submissions = await SubmissionService.getSubmissions();
    res.status(200).json(submissions);
  } catch (error) {
    next(error);
  }
};
