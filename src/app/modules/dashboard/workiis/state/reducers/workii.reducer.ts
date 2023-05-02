import { createReducer, on } from '@ngrx/store';
import { IWorkiiState } from 'src/app/core/models/workii.state';
import { WorkiiActions } from '../actions/workii.actions';
import { IApplicationUser } from '../../interfaces/workii.interface';

export const initialState: IWorkiiState = {
  workiis: [],
  applications: [],
  getWorkii: null,
  getUsersWorkiiApply: [],
  searchWorkiis: [],
  notFound: false,
  searchTerm: '',
  totalResults: 0,
}

export const _workiiReducer = createReducer(
  initialState,
  on(WorkiiActions.logOut, () => initialState),
  on(WorkiiActions.loadWorkiis, (state, { type }) => ({ ...state, type })),
  on(WorkiiActions.loadApplications, (state, { type }) => ({ ...state, type })),
  on(WorkiiActions.listWorkiis, (state, { workiis }) => ({ ...state, loading: false, workiis })),
  on(WorkiiActions.listApplicationsWorkiis, (state, { applications }) => ({ ...state, applications })),
  on(WorkiiActions.loadError, (state, { errorMessage }) => ({ ...state, errorMessage })),
  on(WorkiiActions.createWorkiiSuccess, (state, { workii }) => ({ ...state, workii })),
  on(WorkiiActions.errorCreateWorkii, (state, { errorMessage }) => ({ ...state, errorMessage })),
  on(WorkiiActions.deleteWorkiiSuccess, (state, { id }) => {
    return {
      ...state,
      workiis: state.workiis.filter(worki => worki.id !== id)
    }
  }),
  on(WorkiiActions.deleteApplicationSuccess, (state, { id, workii }) => {
    return {
      ...state,
      applications: state.applications.filter(app => app.id !== id),
      workiis:
        state.workiis
          .map(worki => {
            if (worki.id === id) {
              const apply = Number(worki.applications)
              return {
                ...worki,
                workiis: apply - 1,
              };
            } else {
              return worki;
            }
          })
    }
  }),
  on(WorkiiActions.deleteWorkiiSuccessResponse, (state, { response }) => ({ ...state, response })),
  on(WorkiiActions.deleteWorkiiError, (state, { errorMessage }) => ({ ...state, errorMessage })),
  on(WorkiiActions.deleteApplicationError, (state, { errorMessage }) => ({ ...state, errorMessage })),
  on(WorkiiActions.loadApplicationError, (state, { errorMessage }) => ({ ...state, errorMessage })),
  on(WorkiiActions.cancelWorkiiDelete, (state, { message }) => ({ ...state, message })),
  on(WorkiiActions.cancelApplicationDelete, (state, { message }) => ({ ...state, message })),
  on(WorkiiActions.deleteWorkiiRequest, (state, { id }) => ({ ...state, id })),
  on(WorkiiActions.deleteApplicationRequest, (state, { id, workii }) => ({ ...state, id, workii })),
  on(WorkiiActions.listApplicationsWorkiis, (state, { applications }) => {
    return { ...state, applications }
  }),
  on(WorkiiActions.applyToWorkii, (state, { user, workii }) => {
    const newApplication: IApplicationUser = {
      user: { id: user },
      workii: { id: workii },
    };
    return {
      ...state,
      applications: [...state.applications, newApplication],
      workiis:
        state.workiis.map(workiis => {
          if (workiis.id === workii) {
            const apply = Number(workiis.applications)
            return {
              ...workiis,
              applications: apply + 1,
            };
          } else {
            return workiis;
          }
        }),
    }
  }),
  on(WorkiiActions.errorApplyToWorkii, (state, { errorMessage }) => ({ ...state, errorMessage })),
  on(WorkiiActions.loadWorkii, (state, { slug }) => ({ ...state, slug })),
  on(WorkiiActions.loadWorkiiSucces, (state, { workii }) => ({ ...state, getWorkii: workii })),
  on(WorkiiActions.loadWorkiiError, (state, { errorMessage }) => ({ ...state, errorMessage })),
  on(WorkiiActions.loadUsersApply, (state, { workii, limit, offset }) => ({ ...state, workii, limit, offset })),
  on(WorkiiActions.loadUsersApplySuccess, (state, { workiiUsersApplications }) => ({ ...state, getUsersWorkiiApply: workiiUsersApplications })),
  on(WorkiiActions.loadUsersApplyError, (state, { errorMessage }) => ({ ...state, errorMessage })),
  on(WorkiiActions.searchWorkii, (state) => ({ ...state })),
  on(WorkiiActions.searchWorkiiSuccess, (state, { workiis, totalResults }) => ({ ...state, searchWorkiis: workiis, totalResults, loading: false, notFound: false })),
  on(WorkiiActions.searchWorkiiNotFound, (state) => ({ ...state, searchWorkiis: [], notFound: true })),
  on(WorkiiActions.searchWorkiiFail, (state, { errorMessage }) => ({ ...state, errorMessage })),
  on(WorkiiActions.updateSearchTerm, (state, { searchTerm }) => ({ ...state, searchTerm }))
);


