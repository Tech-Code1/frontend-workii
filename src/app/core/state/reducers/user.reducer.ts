import { createReducer, on } from '@ngrx/store';
import { IUserState } from '../../models/user.state';
import { UserActions } from '../actions/user.actions';

export const initialState: IUserState = { login: null , user: null, userStatus: true, otp: null, email: null, password: null}

export const _userReducer = createReducer(
  initialState,
  on(UserActions.setUser, (state, {user}) =>  ({...state, user: {...user}})),
  on(UserActions.unsetUser, (state, {type}) =>  ({...state, type, user: null})),
  on(UserActions.loginUser, (state, {email, password}) =>  ({...state, email, password})),
  on(UserActions.loginError, (state, {errorMessage}) =>  ({...state, errorMessage})),
  on(UserActions.userNotFound, (state) =>  ({...state, userStatus: false})),
  on(UserActions.userFound, (state) =>  ({...state, userStatus: true})),
  on(UserActions.validateOtp, (state, {otp}) =>  ({...state, otp: {otp} })),
  on(UserActions.validateOtpSuccess, (state, {otp: {otp, ok}}) =>  ({...state, otp: {otp, ok: true}})),
  on(UserActions.validateOtpErrorType, (state, {otp: {otp, ok}}) =>  ({...state, otp: {otp, ok: false}})),
  on(UserActions.validateOtpError, (state, {errorMessage}) =>  ({...state, errorMessage})),
);
