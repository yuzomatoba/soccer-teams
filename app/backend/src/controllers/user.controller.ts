import { RequestHandler } from 'express';
import IUserService from '../interfaces/IUserService';

export default class UserController {
  constructor(private _userService: IUserService) {}

  login: RequestHandler = async (req, res) => {
    const token = await this._userService.login(req.body);
    if (!token) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return res.status(200).json({ token });
  };

  findingRole: RequestHandler = async (req, res, next) => {
    try {
      const role = await this._userService.findingRole(req.body.user.email);
      return res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  };
}
