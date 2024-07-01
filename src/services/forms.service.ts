import { HttpException } from '../exceptions/HttpException';
import { FormModel } from '@/models/forms.model';

export const createForm = async formData => {
  const createdForm = await FormModel.create(formData);
  return createdForm;
};

export const updateForm = async (formId: string, formData) => {
  const updatedForm = await FormModel.findByIdAndUpdate(formId, formData, { new: true });
  if (!updatedForm) {
    throw new HttpException(409, `Form ${formId} doesn't exist`);
  }
  return updatedForm;
};

export const getForms = async () => {
  return await FormModel.find();
};
