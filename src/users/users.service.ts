import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { formatPasswordDTO } from './dto/format-password.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userMailExists = await this.findByMail(createUserDto.email) ;
    const userNameExists = await this.findByName(createUserDto.name) ;
    if(!!userMailExists || !!userNameExists) {
      throw new HttpException("User already exists",HttpStatus.BAD_REQUEST) ;
    } 

    const createdUser = new this.userModel(createUserDto) ;
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findEmails(): Promise<string[]> {
    const users = await this.userModel.find().exec();
    return users.map(user=>user.email) ;
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findByName(name: string|String): Promise<any> {
    return this.userModel.findOne({name}).exec();
  }

  async findByMail(email: string|String): Promise<any>{
    return this.userModel.findOne({email}).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const hashedPassword = await hash(updateUserDto.password.toString(), 10);
    let nameValue = "";
    if (updateUserDto.role.toLowerCase() === "agent") {
      nameValue = updateUserDto.phoneNumber
    }else{
      nameValue = updateUserDto?.email?.toString();
    }
    const userDto: CreateUserDto = {
      name: nameValue,
      email: updateUserDto.email,
      role: updateUserDto.role,
      phoneNumber: updateUserDto.phoneNumber,
      password: hashedPassword,
      status : updateUserDto.status,
    };
    return this.userModel.findByIdAndUpdate(id,{$set: userDto},{new: true}).exec();
  }

  async formatPassword(id: string) {
    const hashedPassword = await hash("azerty", 10);
    const userDto: formatPasswordDTO = {
      password: hashedPassword,
      status : "false",
    };
    return this.userModel.findByIdAndUpdate(id,{$set: userDto},{new: true}).exec();
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id).exec();
    return `Task #${id} deleted`;
  }
  async findByPhoneNumber(phoneNumber: string|String): Promise<any>{
    return this.userModel.findOne({phoneNumber}).exec();
  }
}
