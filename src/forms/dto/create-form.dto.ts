import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray } from 'class-validator';
import { Condition, Field,Validation } from '../schemas/form.schema';

export class CreateFormDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  version: string;

  @IsNotEmpty()
  category: string;

  fields?: Field[] ;

  conditions?: Condition[];

  validation?: Validation;

  groups?: string[];
}
