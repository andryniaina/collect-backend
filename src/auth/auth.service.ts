import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from '../users/schemas/user.schema';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    let user = await this.usersService.findByName(username);

    if (!user) {
      user = await this.usersService.findByMail(username);
      if (!user) {
        throw new NotFoundException('User not found');
      }
    }

    const isPasswordMatching: boolean = await compare(pass, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Incorrect password');
    }
    const payload = { sub: user._id, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(username: string, email: string, pass: string): Promise<User> {
    const hashedPassword = await hash(pass, 10);

    const userDto: CreateUserDto = {
      name: username,
      email: email,
      password: hashedPassword,
    };
    const createdUser = await this.usersService.create(userDto);
    return createdUser;
  }
}
