import { Router } from 'express';
import * as AuthController from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

const path = '/';
const router = Router();

router.post(`${path}signup`, ValidationMiddleware(CreateUserDto), AuthController.signUp);
router.post(`${path}login`, ValidationMiddleware(CreateUserDto), AuthController.logIn);
router.post(`${path}logout`, AuthMiddleware, AuthController.logOut);

export const AuthRoute: Routes = { router };
