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
import { UpdateFieldsDto } from './dto/update-fields.dto';

@Controller('forms')
export class FormsController {
  constructor(private readonly FormsService: FormsService) {}

  
  @Post()
  create(@Body() createFormDto: CreateFormDto, @Request() req) {
    return this.FormsService.create(createFormDto);
  }

  
  @Get()
  findAll(@Request() req) {
    return this.FormsService.findAll();
  }

  
  @Get("/:id")
  findOne(@Param('id') id:string) {
    return this.FormsService.findOne(id)
  }

  
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.FormsService.remove(id);
  }

  
  @Put(':id')
  update(@Param('id') id: string, @Body() updateFieldsDto: UpdateFieldsDto) {
    return this.FormsService.updateFields(id,updateFieldsDto) ;
  }
}
