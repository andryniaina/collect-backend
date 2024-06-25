import { Router } from 'express';
import * as UserController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

const path = '/users';
const router = Router();

router.get('', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.post('', ValidationMiddleware(CreateUserDto), UserController.createUser);
router.put('/:id', ValidationMiddleware(CreateUserDto, true), UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export const UserRoute: Routes = { path, router };
