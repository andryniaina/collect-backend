import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray } from 'class-validator';
import { Field } from '../schemas/form.schema';

export class CreateFormDto {
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'List of properties of the form' })
  @IsArray()
  fields: Field[];
}
