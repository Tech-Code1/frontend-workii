import { ActionReducerMap } from '@ngrx/store';

import { _workiiReducer } from '../../modules/dashboard/workiis/state/reducers/workii.reducer';
import { IWorkiiState } from '../models/workii.state';
import { ILoginState } from '../models/login.state';
import { IUserState } from '../models/user.state';
import { _userReducer } from './reducers/user.reducer';

export interface IAppState {
  workiis: IWorkiiState,
  user: IUserState
}

export const ROOT_REDUCERS: ActionReducerMap<IAppState> = {
  user: _userReducer,
  workiis: _workiiReducer
}
