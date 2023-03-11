import { createReducer, on } from '@ngrx/store';
import { IWorkiiState } from 'src/app/core/models/workii.state';
import { WorkiiActions } from '../actions/workii.actions';

export const initialState: IWorkiiState = { loading: false, workiis: [], applications: [] };

export const _workiiReducer = createReducer(
  initialState,
  on(WorkiiActions.loadWorkiis, (state) => {
    return {...state, loading: true}
  }),
  on(WorkiiActions.listWorkiis, (state, {workiis}) => {
    return {...state, loading: false, workiis}
  }),
  on(WorkiiActions.createWorkiiSuccess, (state, {workii}) => {
    return {...state, workii}
  }),
  on(WorkiiActions.deleteWorkiiSuccess,(state,{id})=>{
    return {
      ...state,
      workiis : state.workiis.filter(worki=>worki.id !== id)
    }
  }),
  on(WorkiiActions.listApplicationsWorkiis,(state,{applications})=>{
    return {...state, applications}
  }),
);


