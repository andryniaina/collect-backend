import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';
import { CreateSubmissionDto } from './dto/create-submission.dto';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @ApiTags('Endpoints for Submissions')
  @Public()
  @Post()
  create(@Body() createSubmissionDto: CreateSubmissionDto, @Request() req) {
    return this.submissionsService.create(createSubmissionDto);
  }

  @ApiTags('Endpoints for Submissions')
  @Public()
  @Get()
  findAll(@Request() req) {
    return this.submissionsService.findAll();
  }
}
