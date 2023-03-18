import { createSelector } from '@ngrx/store';
import { ILoginState } from 'src/app/core/models/login.state';
import { IAppState } from 'src/app/core/state/app.state';

export const selectLogin = (state: IAppState) => state.login;

export const selectListWorkiis = createSelector(
  selectLogin,
  ({login}: ILoginState) => login
);
