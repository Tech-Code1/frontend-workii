import { createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/core/state/app.state';
import { IWorkiiState } from '../../../../../core/models/workii.state';

export const selectWorkiis = (state: IAppState) => state.workiis;

export const selectListWorkiis = createSelector(
  selectWorkiis,
({workiis}: IWorkiiState) => workiis
);

export const selectWorkiiId = createSelector(
  selectWorkiis,
({workiis}: IWorkiiState) => workiis.map(workii => workii.id));

export const selectLoading = createSelector(
  selectWorkiis,
  ({loading}: IWorkiiState) => loading
);

export const selectListApplications = createSelector(
  selectWorkiis,
  ({applications}: IWorkiiState) => applications
);

export const selectCurrentWorkii = createSelector(
  selectWorkiis,
  ({getWorkii}: IWorkiiState) => getWorkii
)
