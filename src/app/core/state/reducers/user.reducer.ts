import { createReducer, on, select } from '@ngrx/store';
import { IUserState } from '../../models/user.state';
import { UserActions } from '../actions/user.actions';

export const initialState: IUserState = { login: null , user: null, userStatus: true, otp: null, email: null, password: null, tokenValid: false}

export const _userReducer = createReducer(
  initialState,
  on(UserActions.getUser, (state, {id}) =>  ({...state, id})),
  on(UserActions.getUserError, (state, {errorMessage}) =>  ({...state, errorMessage, user: null})),
  on(UserActions.setUser, (state, {user}) =>  ({...state, user: {...user}})),
  on(UserActions.unsetUser, (state, {type}) =>  ({...state, type, user: null})),
  on(UserActions.loginUser, (state, {email, password}) =>  ({...state, email, password, tokenValid: true})),
  on(UserActions.loginSuccess, (state, token) =>  ({...state, token, tokenValid: true})),
  on(UserActions.loginError, (state, {errorMessage}) =>  ({...state, errorMessage})),
  on(UserActions.navigateAfterLogin, (state) =>  ({...state})),
  on(UserActions.logOut, () => initialState),
  on(UserActions.userNotFound, (state) =>  ({...state, userStatus: false})),
  on(UserActions.userFound, (state) =>  ({...state, userStatus: true})),
  on(UserActions.validateOtp, (state, {otp}) =>  ({...state, otp: {otp} })),
  on(UserActions.validateOtpSuccess, (state, {otp: {otp, ok}}) =>  ({...state, otp: {otp, ok: true}})),
  on(UserActions.validateOtpErrorType, (state, {otp: {otp, ok}}) =>  ({...state, otp: {otp, ok: false}})),
  on(UserActions.validateOtpError, (state, {errorMessage}) =>  ({...state, errorMessage})),
  on(UserActions.registerUser, (state) =>  ({...state})),
  on(UserActions.registerUserSuccess, (state) =>  ({...state})),
  on(UserActions.registerUserNavigateToDashboard, (state) =>  ({...state, email: null, password: null, otp: null, userStatus: true})),
  on(UserActions.registerUserError, (state) =>  ({...state, email: null, password: null, otp: null, userStatus: true})),
  on(UserActions.validateToken, (state) =>  ({...state})),
  on(UserActions.validateTokenSuccess, (state) =>  ({...state, tokenValid: true})),
  on(UserActions.validateTokenError, (state) =>  ({...state, tokenValid: false})),
  //on(UserActions.refreshToken, (state) =>  ({...state})),
  //on(UserActions.refreshTokenSuccess, (state,  { accessToken, refreshToken }) =>  ({...state, accessToken, refreshToken, tokenValid: true })),
  //on(UserActions.refreshTokenFailure, (state) =>  ({...state, tokenValid: false})),
);
