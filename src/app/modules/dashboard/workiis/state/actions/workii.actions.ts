import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { IWorkii } from 'src/app/core/models/workii.interface';

export const WorkiiActions = createActionGroup({
  source: 'Workii Page',
  events: {
    'load workiis': emptyProps(),
    'list workiis': (workiis: IWorkii[]) => ({ workiis })
  }
})

/* export const loadWorkiis = createAction(
  '[Workii Page] Cargardo workiis',
);

export const createWorkii = createAction(
  '[Workii Page] Crear workii',
  props<{workii: IWorkii}>()
); */

