import { Router } from 'express';
import * as UserController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, UserController.getUsers);
    this.router.get(`${this.path}/:id`, UserController.getUserById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), UserController.createUser);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateUserDto, true), UserController.updateUser);
    this.router.delete(`${this.path}/:id`, UserController.deleteUser);
  }
}
