import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './schemas/group.schema';
import { Model } from 'mongoose';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group.name) private groupModel: Model<Group>) {}

  async create(createGroupDto: CreateGroupDto) {
    const createdGroup = new this.groupModel(createGroupDto);
    return createdGroup.save();
  }

  async findAll() {
    return this.groupModel.find().populate('users').exec();
  }

  async findOne(groupId: string) {
    return this.groupModel.findById(groupId).populate('users').exec();
  }

  async deleteOne(groupId: string) {
    return this.groupModel.findByIdAndDelete(groupId).exec();
  }

  async updateOne(groupId: string, updateGroupDto: UpdateGroupDto ){
    return this.groupModel.updateOne({_id:groupId},{$set: updateGroupDto}).exec();
  }
}
