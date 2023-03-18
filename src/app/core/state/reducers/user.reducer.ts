import { createReducer, on } from '@ngrx/store';
import { IUserState } from '../../models/user.state';
import { UserActions } from '../actions/user.actions';

export const initialState: IUserState = { login: null , user: null}

export const _userReducer = createReducer(
  initialState,
  on(UserActions.loginRequest, (state, {type}) =>  ({...state, type})),
  on(UserActions.loginSuccess, (state, {type}) =>  ({...state, type})),
  on(UserActions.loginError, (state, {type}) =>  ({...state, type})),
);
