import { Router } from 'express';
import * as AuthController from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class AuthRoute implements Routes {
  public path = '/';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, ValidationMiddleware(CreateUserDto), AuthController.signUp);
    this.router.post(`${this.path}login`, ValidationMiddleware(CreateUserDto), AuthController.logIn);
    this.router.post(`${this.path}logout`, AuthMiddleware, AuthController.logOut);
  }
}
