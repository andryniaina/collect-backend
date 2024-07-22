import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';
import { UpdateFieldsDto } from './dto/update-fields.dto';

@Controller('forms')
export class FormsController {
  constructor(private readonly FormsService: FormsService) {}

  @Public()
  @Post()
  create(@Body() createFormDto: CreateFormDto, @Request() req) {
    return this.FormsService.create(createFormDto);
  }

  @Public()
  @Get()
  findAll(@Request() req) {
    return this.FormsService.findAll();
  }

  @Public()
  @Get("/:id")
  findOne(@Param('id') id:string) {
    return this.FormsService.findOne(id)
  }

  @Public()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.FormsService.remove(id);
  }

  @Public()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateFieldsDto: UpdateFieldsDto) {
    return this.FormsService.updateFields(id,updateFieldsDto) ;
  }
}
