import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class SignInDto {
    @ApiProperty({description: "Username or email of the user"})
    @IsNotEmpty()
    username: string

    @ApiProperty({description: "Password of the user"})
    @IsNotEmpty()
    password: string
}
