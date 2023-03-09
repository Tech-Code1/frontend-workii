import { Action, createReducer, on } from '@ngrx/store';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { IWokiiState } from 'src/app/core/models/workii.state';
import { WorkiiActions } from '../actions/workii.actions';

export const initialState: IWokiiState = { loading: false, workiis: []};

export const _workiiReducer = createReducer(
  initialState,
  on(WorkiiActions.loadWorkiis, (state) => {
    return {...state, loading: true}
  }),
  on(WorkiiActions.listWorkiis, (state, {workiis}) => {
    return {...state, loading: false, workiis}
  }),
);

/* export function workiiReducer(state: IWokiiState | undefined, action: Action) {

  return _workiiReducer(state, action);
} */
