import { Injectable, NotFoundException } from '@nestjs/common';
import { Form } from './schemas/form.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFieldsDto } from './dto/update-fields.dto';
import { DeleteFormsDto } from './dto/delete-forms.dto';

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

  async findOne(id:string) {
    return this.formModel.findById(id).exec() ;
  }

  async remove(id: string) {
    await this.formModel.findByIdAndDelete(id).exec();
    return `Form #${id} deleted`;
  }

  async deleteAll(deleteFormsDto:DeleteFormsDto) {
    const { ids } = deleteFormsDto;
    await this.formModel.deleteMany({ _id: { $in: ids } }).exec();
    return `Forms #${ids} deleted`;
  }

  async updateFields(id:string, updateFieldsDto:UpdateFieldsDto) {
    const existingForm = await this.formModel.findOneAndUpdate({_id:id},{$set: updateFieldsDto},{new:true}).exec() ;
    if(!existingForm) {
      throw new NotFoundException(`Form ${id} not found`) ;
    }
    return existingForm ;
  }
}
