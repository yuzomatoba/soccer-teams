import ILogin from './ILogin';

export default interface IUserService {
  login(login: ILogin): Promise<string | void>
  findingRole(email: string): Promise<{ role: string } | void>
}
