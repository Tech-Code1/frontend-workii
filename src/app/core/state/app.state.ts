import { ActionReducerMap } from '@ngrx/store';

import { _workiiReducer } from '../../modules/dashboard/workiis/state/reducers/workii.reducer';
import { IWorkiiState } from '../models/workii.state';
import { ILoginState } from '../models/login.state';
import { _loginReducer } from 'src/app/modules/auth/state/reducers/login.reducer';

export interface IAppState {
  login: ILoginState,
  workiis: IWorkiiState
}

export const ROOT_REDUCERS: ActionReducerMap<IAppState> = {
  login: _loginReducer,
  workiis: _workiiReducer
}
