import { createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/core/state/app.state';
import { IUserState } from '../../models/user.state';

export const selectUser = (state: IAppState) => state.user;

export const selectLoginUser = createSelector(selectUser, ({ login }: IUserState) => login);

export const selectOneUser = createSelector(selectUser, ({ user }: IUserState) => user);

export const selectStatusUser = createSelector(selectUser, ({ userStatus }: IUserState) => userStatus);

export const selectOtp = createSelector(selectUser, ({ otp }: IUserState) => otp);

export const selectEmail = createSelector(selectUser, ({ email }: IUserState) => email);

export const selectPassword = createSelector(selectUser, ({ password }: IUserState) => password);

export const selectAuthStatus = createSelector(selectUser, ({ tokenValid }: IUserState) => tokenValid);
