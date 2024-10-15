import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GroupService } from './group.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './users.decorator';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@ApiTags('Endpoints for users information')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly groupService: GroupService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('emails')
  findEmails() {
    return this.usersService.findEmails();
  }

  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Public()
  @Get('phoneNumber/:phoneNumber')
  findPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    return this.usersService.findByPhoneNumber(phoneNumber);
  }

  @Public()
  @Patch('formatPassword/:id')
  formatPassword(@Param('id') id: string) {
    return this.usersService.formatPassword(id);
  }

  @Public() //remove when prod
  @Post('/group')
  createGroup(@Body() createGroupDto: CreateGroupDto) {
    console.log('GroupDto => ', createGroupDto);
    return this.groupService.create(createGroupDto);
  }

  @Public() //remove when prod
  @Get('/group')
  getGroups() {
    return this.groupService.findAll();
  }

  @Public() //remove when prod
  @Get('/group/:groupId')
  getGroup(@Param('groupId') groupId: string) {
    return this.groupService.findOne(groupId);
  }

  @Public() //remove when prod
  @Delete('/group/:groupId')
  deleteGroup(@Param('groupId') groupId: string) {
    return this.groupService.deleteOne(groupId);
  }

  @Public()
  @Put('/group/:groupId')
  updateGroup(
    @Param('groupId') groupId: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupService.updateOne(groupId, updateGroupDto);
  }
}
