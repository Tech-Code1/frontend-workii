import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { IWorkiiCreate, IApplicationResponse, IApplicationUser } from '../../interfaces/workii.interface';

export const WorkiiActions = createActionGroup({
  source: 'Workii Page',
  events: {
    'Load workiis': emptyProps(),
    'Load Applications': emptyProps(),
    'List workiis': (workiis: readonly IWorkii[]) => ({ workiis }),
    'List Applications Workiis': (applications: readonly IApplicationUser[]) => ({ applications }),
    'Load Error':   props<{errorMessage: string}>(),
    'Create Workii Success':  (workii: IWorkiiCreate) => ({ workii }),
    'Error Create Workii':  props<{errorMessage: string}>(),
    'Delete Workii Success':  (id: string) => ({ id }),
    'Delete Workii Success Response':  (response: IApplicationResponse) => ({ response }),
    'Delete Workii Error':  props<{errorMessage: string}>(),
    'Load Application Error':  props<{errorMessage: string}>(),
    'Cancel Workii Delete':  props<{message: string}>(),
    'Delete Workii Request':  (id: string) => ({ id }),
  }
})

/* export const loadWorkiis = createAction(
  '[Workii Page] Cargardo workiis',
);

export const createWorkii = createAction(
  '[Workii Page] Crear workii',
  props<{workii: IWorkii}>()
); */

