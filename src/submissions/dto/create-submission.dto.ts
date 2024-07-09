import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray } from 'class-validator';

export class CreateSubmissionDto {
  @IsNotEmpty()
  formId: string;

  @IsNotEmpty()
  data: string;
}
