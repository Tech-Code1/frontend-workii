import { ILogin } from '../../modules/auth/DTOs/loginDTO';
import { IOtp } from '../../modules/auth/interfaces/auth.interface';
import { IUserDto } from './user.interface';

export interface IUserState {
	login: ILogin | null;
	user: IUserDto | null;
	userStatus: boolean;
	otp: IOtp | null;
	email: string | null;
	password: string | null;
	tokenValid: boolean;
}
