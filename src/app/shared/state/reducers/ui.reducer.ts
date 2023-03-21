import { createReducer, on } from '@ngrx/store';
import { IUiState } from 'src/app/core/models/ui.state';
import { UiActions } from '../actions/ui.actions';

export const initialState: IUiState = { isLoading: false}

export const _uiReducer = createReducer(
  initialState,
  on(UiActions.isLoading, (state) =>  ({...state, isLoading: true})),
  on(UiActions.stopLoading, (state) =>  ({...state, isLoading: false})),
);
