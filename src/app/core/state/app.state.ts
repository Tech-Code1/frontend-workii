import { ActionReducerMap } from '@ngrx/store';
import { IWokiiState } from 'src/app/core/models/workii.state';
import { _workiiReducer } from '../../modules/dashboard/workiis/state/reducers/workii.reducer';

export interface IAppState {
  workiis: IWokiiState
}

export const ROOT_REDUCERS: ActionReducerMap<IAppState> = {
  workiis: _workiiReducer
}
