import { Router } from 'express';
import * as AuthController from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

const path = '/';
const router = Router();

router.post('signup', ValidationMiddleware(CreateUserDto), AuthController.signUp);
router.post('login', ValidationMiddleware(CreateUserDto), AuthController.logIn);
router.post('logout', AuthMiddleware, AuthController.logOut);

export const AuthRoute: Routes = { path, router };
