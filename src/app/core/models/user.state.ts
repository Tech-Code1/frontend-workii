import { IUserDTO } from "./user.interface";
import { loginDTO } from '../../modules/auth/DTOs/loginDTO';

export interface IUserState {
  login: loginDTO | null,
  user: IUserDTO | null
}
