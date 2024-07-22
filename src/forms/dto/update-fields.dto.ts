import { IsArray } from "class-validator";
import { Field } from "../schemas/form.schema";

export class UpdateFieldsDto {
    @IsArray()
    fields: Field[] ;
}