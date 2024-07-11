import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';

  @ApiTags("Endpoints for authentication")
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
      return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('register')
    signUp(@Body() signUpDto: SignUpDto) {
      return this.authService.signUp(signUpDto.username, signUpDto.email, signUpDto.password,signUpDto.role);
    }
  
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }