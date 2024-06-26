import * as FormService from '@services/forms.service';
import { NextFunction, Request, Response } from 'express';

export const createForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdForm = await FormService.createForm(req.body);
    res.status(201).json(createdForm);
  } catch (error) {
    next(error);
  }
};

export const updatedForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: formId } = req.params;
    const updatedForm = await FormService.updateForm(formId, req.body);
    res.status(200).json(updatedForm);
  } catch (error) {
    next(error);
  }
};

export const getForms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const forms = await FormService.getForms();
    res.status(200).json(forms);
  } catch (error) {
    next(error);
  }
};
