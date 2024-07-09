import {
  Controller,
  Get,
  Post,
  Body,
  Request,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';

@Controller('forms')
export class FormsController {
  constructor(private readonly FormsService: FormsService) {}

  @ApiTags('Endpoints for Forms')
  @Public()
  @Post()
  create(@Body() createFormDto: CreateFormDto, @Request() req) {
    return this.FormsService.create(createFormDto);
  }

  @ApiTags('Endpoints for Forms')
  @Public()
  @Get()
  findAll(@Request() req) {
    return this.FormsService.findAll();
  }
}
