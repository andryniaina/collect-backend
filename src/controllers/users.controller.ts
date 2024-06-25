import { NextFunction, Request, Response } from 'express';
import { User } from '@interfaces/users.interface';
import * as UserService from '@services/users.service';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const findAllUsersData: User[] = await UserService.findAllUser();

    res.status(200).json({ data: findAllUsersData, message: 'findAll' });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: string = req.params.id;
    const findOneUserData: User = await UserService.findUserById(userId);

    res.status(200).json({ data: findOneUserData, message: 'findOne' });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: User = req.body;
    const createUserData: User = await UserService.createUser(userData);

    res.status(201).json({ data: createUserData, message: 'created' });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: string = req.params.id;
    const userData: User = req.body;
    const updateUserData: User = await UserService.updateUser(userId, userData);

    res.status(200).json({ data: updateUserData, message: 'updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: string = req.params.id;
    const deleteUserData: User = await UserService.deleteUser(userId);

    res.status(200).json({ data: deleteUserData, message: 'deleted' });
  } catch (error) {
    next(error);
  }
};
