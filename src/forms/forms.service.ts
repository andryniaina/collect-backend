import { Injectable } from '@nestjs/common';
import { Form } from './schemas/form.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFormDto } from './dto/create-form.dto';

@Injectable()
export class FormsService {
  constructor(@InjectModel(Form.name) private formModel: Model<Form>) {}

  async create(createFormDtoDto: CreateFormDto | Record<string, any>) {
    const createdForm = new this.formModel(createFormDtoDto);
    return createdForm.save();
  }

  async findAll() {
    return this.formModel.find().exec();
  }
}
