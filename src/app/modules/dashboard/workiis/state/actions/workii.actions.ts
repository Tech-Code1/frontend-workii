import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { IWorkiiCreate } from '../../interfaces/workii.interface';

export const WorkiiActions = createActionGroup({
  source: 'Workii Page',
  events: {
    'Load workiis': emptyProps(),
    'List workiis': (workiis: readonly IWorkii[]) => ({ workiis }),
    'Load Error':   props<{errorMessage: string}>(),
    'Create Workii Success':  (workii: IWorkiiCreate) => ({ workii }),
    'Error Create Workii':  props<{errorMessage: string}>(),
  }
})

/* export const loadWorkiis = createAction(
  '[Workii Page] Cargardo workiis',
);

export const createWorkii = createAction(
  '[Workii Page] Crear workii',
  props<{workii: IWorkii}>()
); */

