import { ActionReducerMap } from '@ngrx/store';

import { _workiiReducer } from '../../modules/dashboard/workiis/state/reducers/workii.reducer';
import { IWorkiiState } from '../models/workii.state';

export interface IAppState {
  workiis: IWorkiiState
}

export const ROOT_REDUCERS: ActionReducerMap<IAppState> = {
  workiis: _workiiReducer
}
