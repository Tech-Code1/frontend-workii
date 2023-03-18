import { createReducer, on } from '@ngrx/store';
import { ILoginState } from 'src/app/core/models/login.state';
import { LoginActions } from '../actions/login.actions';

export const initialState: ILoginState = { login: {email: '', password: ''}}

export const _loginReducer = createReducer(
  initialState,
  on(LoginActions.loginRequest, (state, {type}) =>  ({...state, type})),
  on(LoginActions.loginSuccess, (state, {type}) =>  ({...state, type})),
  on(LoginActions.loginError, (state, {type}) =>  ({...state, type})),
);


