import * as bcrypt from 'bcryptjs';
import User from '../database/models/user.model';
import ILogin from '../interfaces/ILogin';
import generatingToken from '../utils/generatingToken';
import GeneratingError from '../utils/generatingError';
import IUserService from '../interfaces/IUserService';

export default class UserService implements IUserService {
  constructor(private _userModel = User) {}

  login = async (login: ILogin): Promise<string | void> => {
    const { email, password } = login;
    const isAnUser = await this._userModel.findOne({ where: { email } });

    if (isAnUser && bcrypt.compareSync(password, isAnUser.password)) {
      return generatingToken(login);
    }
    throw new GeneratingError(401, 'Invalid email or password');
  };

  findingRole = async (email: string): Promise<{ role: string } | void> => {
    const userInfo = await this._userModel.findOne({ where: { email } });
    if (userInfo) return { role: userInfo.role };
    throw new GeneratingError(401, 'Invalid email or password');
  };
}
