import { IUserDTO } from './user.interface';
import { loginDTO } from '../../modules/auth/DTOs/loginDTO';
import { IOtp } from '../../modules/auth/interfaces/auth.interface';

export interface IUserState {
	login: loginDTO | null;
	user: IUserDTO | null;
	userStatus: boolean;
	otp: IOtp | null;
	email: string | null;
	password: string | null;
	tokenValid: boolean;
}
