import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
    @ApiProperty({description: "Username of the user"})
    username: string

    @ApiProperty({description: "Email of the user"})
    @IsEmail()
    email: string

    @ApiProperty({description: "Password of the user"})
    @IsNotEmpty()
    password: string

    @ApiProperty({description: "Role of the user"})
    @IsNotEmpty()
    role: string

    @ApiProperty({description: "Phone Number of the user"})
    phoneNumber?: string

    @ApiProperty({description: "If the user has already been connected or not"})
    status?: string
}
