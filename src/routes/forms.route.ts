import { Routes } from '@/interfaces/routes.interface';
import * as FormController from '@controllers/form.controller';
import { Router } from 'express';

const path = '/forms';
const router = Router();

router.get('', FormController.getForms);
router.post('', FormController.createForm);
router.put('/:id', FormController.updatedForm);

export const FormRoute: Routes = { path, router };
