import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
    @ApiProperty({description: "Username of the user"})
    name: string

    @ApiProperty({description: "Email of the user"})
    @IsEmail()
    email: string

    @ApiProperty({description: "Password of the user"})
    @IsNotEmpty()
    password: string

    @ApiProperty({description: "Phone Number of the user"})
    phoneNumber?: string
}
