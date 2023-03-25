import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IAuthResponse, IOtp } from 'src/app/modules/auth/interfaces/auth.interface';
import { IUserDTO } from '../../models/user.interface';

export const UserActions = createActionGroup({
  source: 'Auth',
  events: {
    'Set User': (user: IUserDTO) => ({ user }),
    'Unset User': emptyProps(),
    'Login User': (email: string, password: string) => ({ email, password }),
    'Login Success': (token: string) => ({ token }),
    'Login Error': (errorMessage: string) => ({ errorMessage }),
    'User Not Found': emptyProps(),
    'User Found': emptyProps(),
    'Validate Otp': ({otp}: IOtp) => ({ otp }),
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
    'Validate Token Error': (errorMessage: string) => ({ errorMessage }),
    //'Login Error': emptyProps(),
    //'List workiis': (workiis: readonly IWorkii[]) => ({ workiis }),
  }
})
