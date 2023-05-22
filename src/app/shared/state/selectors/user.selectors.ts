import { createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/core/state/app.state';
import { IUiState } from '../../../core/models/ui.state';

export const selectUi = (state: IAppState) => state.ui;

export const selectLoadingUi = createSelector(selectUi, ({ isLoading }: IUiState) => isLoading);
