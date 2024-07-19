import { Controller, Get, Post, Body, Patch, Param, Delete,Request,HttpCode,HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './users.decorator';
import { formatPasswordDTO } from './dto/format-password.dto';

@ApiTags("Endpoints for users information")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('emails')
  findEmails(){
    return this.usersService.findEmails();
  }

  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Public()
  @Get('phoneNumber/:phoneNumber')
  findPhoneNumber(@Param('phoneNumber') phoneNumber: string){
    return this.usersService.findByPhoneNumber(phoneNumber);
  }

  @Public()
  @Patch('formatPassword/:id')
  formatPassword(@Param('id') id: string){
    return this.usersService.formatPassword(id);
  }
  
}
