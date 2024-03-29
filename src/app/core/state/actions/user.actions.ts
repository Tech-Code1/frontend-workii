import { createActionGroup, emptyProps } from '@ngrx/store';
import { IOtp } from 'src/app/modules/auth/interfaces/auth.interface';
import { IUserDto } from '../../models/user.interface';

export const UserActions = createActionGroup({
	source: 'Auth',
	events: {
		'Get User': (id: string) => ({ id }),
		'Get User Error': (errorMessage: string) => ({ errorMessage }),
		'Set User': (user: IUserDto) => ({ user }),
		// *'Load Current User': emptyProps(),
		// *'Current User Loaded': (id: string) => ({ id }),
		// *'Current User Load Error': (errorMessage: string) => ({ errorMessage }),
		'Unset User': emptyProps(),
		'Login User': (email: string, password: string) => ({ email, password }),
		'Login Success': (token: string) => ({ token }),
		'Login Error': (errorMessage: string) => ({ errorMessage }),
		'Navigate After Login': emptyProps(),
		'Log Out': emptyProps(),
		'User Not Found': emptyProps(),
		'User Found': emptyProps(),
		'Validate Otp': ({ otp }: IOtp) => ({ otp }),
		'Validate Otp Success': (otp: IOtp) => ({ otp }),
		'Validate Otp Error Type': (otp: IOtp) => ({ otp }),
		'Validate Otp Error': (errorMessage: string) => ({ errorMessage }),
		'Register User': emptyProps(),
		'Register User Success': emptyProps(),
		'Register User Navigate To Dashboard': emptyProps(),
		'Register User Show Message': emptyProps(),
		'Register User Error': (errorMessage: string) => ({ errorMessage }),
		'Validate Token': emptyProps(),
		'Validate Token Success': (tokenValid: boolean) => ({ tokenValid }),
		'Validate Token Error': (errorMessage: string) => ({ errorMessage })
		//'Refresh Token': (refreshToken: string) => ({ refreshToken }),
		//'Refresh Token Success': ( accessToken: string, refreshToken: string ) => ({ accessToken, refreshToken }),
		//'Refresh Token Failure': (errorMessage: string) => ({ errorMessage }),
		//'Login Error': emptyProps(),
		//'List workiis': (workiis: readonly IWorkii[]) => ({ workiis }),
	}
});
