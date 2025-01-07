import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray } from 'class-validator';
import { Condition, Field,Validation } from '../schemas/form.schema';

export class CreateFormDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  version?: string;

  @IsNotEmpty()
  section: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  country: string;

  header?: string;

  logo?: string;

  fields?: Field[] ;

  conditions?: Condition[];

  validation?: Validation;

  groups?: string[];

  project?: string;
}
