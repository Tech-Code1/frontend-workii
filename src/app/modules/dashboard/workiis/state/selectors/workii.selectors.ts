import { createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/core/state/app.state';
import { IWokiiState } from '../../../../../core/models/workii.state';

export const selectWorkiis = (state: IAppState) => state.workiis;

export const selectListWorkiis = createSelector(
  selectWorkiis,
({workiis}: IWokiiState) => workiis
);

export const selectLoading = createSelector(
  selectWorkiis,
  ({loading}: IWokiiState) => loading
);
