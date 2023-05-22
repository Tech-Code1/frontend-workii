import { createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/core/state/app.state';
import { IWorkiiState } from '../../../../../core/models/workii.state';

export const selectWorkiis = (state: IAppState): IWorkiiState => state.workiis;

export const selectListWorkiis = createSelector(selectWorkiis, ({ workiis }: IWorkiiState) => workiis);

export const selectWorkiiId = createSelector(selectWorkiis, ({ workiis }: IWorkiiState) =>
	workiis.map((workii) => workii.id)
);

export const selectListApplications = createSelector(selectWorkiis, ({ applications }: IWorkiiState) => applications);

export const selectCurrentWorkii = createSelector(selectWorkiis, ({ getWorkii }: IWorkiiState) => getWorkii);

export const selectUsersApplyToWorkii = createSelector(
	selectWorkiis,
	({ getUsersWorkiiApply }: IWorkiiState) => getUsersWorkiiApply
);

export const selectSearchWorkiis = createSelector(selectWorkiis, ({ searchWorkiis }: IWorkiiState) => searchWorkiis);

export const selectNotFound = createSelector(selectWorkiis, ({ notFound }) => notFound);

export const selectSearchTerm = createSelector(selectWorkiis, ({ searchTerm }) => searchTerm);

export const selectTotalResults = createSelector(selectWorkiis, ({ totalResults }) => totalResults);

export const selectTotalSearchResults = createSelector(selectWorkiis, ({ totalSearchResults }) => totalSearchResults);
