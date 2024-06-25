import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import * as AuthService from '@services/auth.service';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: User = req.body;
    const signUpUserData: User = await AuthService.signup(userData);

    res.status(201).json({ data: signUpUserData, message: 'signup' });
  } catch (error) {
    next(error);
  }
};

export const logIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: User = req.body;
    const { cookie, findUser } = await AuthService.login(userData);

    res.setHeader('Set-Cookie', [cookie]);
    res.status(200).json({ data: findUser, message: 'login' });
  } catch (error) {
    next(error);
  }
};

export const logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const userData: User = req.user;
    const logOutUserData: User = await AuthService.logout(userData);

    res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
    res.status(200).json({ data: logOutUserData, message: 'logout' });
  } catch (error) {
    next(error);
  }
};
