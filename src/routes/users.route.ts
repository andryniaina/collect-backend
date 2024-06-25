import { Router } from 'express';
import * as UserController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

const path = '/users';
const router = Router();

router.get(`${path}`, UserController.getUsers);
router.get(`${path}/:id`, UserController.getUserById);
router.post(`${path}`, ValidationMiddleware(CreateUserDto), UserController.createUser);
router.put(`${path}/:id`, ValidationMiddleware(CreateUserDto, true), UserController.updateUser);
router.delete(`${path}/:id`, UserController.deleteUser);

export const UserRoute: Routes = { router };
