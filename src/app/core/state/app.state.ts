import { ActionReducerMap } from '@ngrx/store';

import { _workiiReducer } from '../../modules/dashboard/workiis/state/reducers/workii.reducer';
import { IWorkiiState } from '../models/workii.state';
import { ILoginState } from '../models/login.state';
import { IUserState } from '../models/user.state';
import { _userReducer } from './reducers/user.reducer';
import { _uiReducer } from 'src/app/shared/state/reducers/ui.reducer';
import { IUiState } from '../models/ui.state';

export interface IAppState {
  ui: IUiState,
  workiis: IWorkiiState,
  user: IUserState,
}

export const ROOT_REDUCERS: ActionReducerMap<IAppState> = {
  ui: _uiReducer,
  user: _userReducer,
  workiis: _workiiReducer,
}
