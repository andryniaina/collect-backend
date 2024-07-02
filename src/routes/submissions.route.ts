import { Routes } from '@/interfaces/routes.interface';
import * as SubmissionController from '@controllers/submissions.controller';
import { Router } from 'express';

const path = '/submissions';
const router = Router();

router.get('', SubmissionController.getSubmissions);
router.post('', SubmissionController.createSubmission);
router.put('/:id', SubmissionController.updatedSubmission);

export const SubmissionRoute: Routes = { path, router };
