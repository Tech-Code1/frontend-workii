import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { IWorkiiCreate, IApplicationResponse, IApplicationUser, IApplication } from '../../interfaces/workii.interface';

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
    'Delete Application Success':  (id: string) => ({ id }),
    'Delete Workii Success Response':  (response: IApplicationResponse) => ({ response }),
    'Delete Workii Error':  props<{errorMessage: string}>(),
    'Delete Application Error':  props<{errorMessage: string}>(),
    'Load Application Error':  props<{errorMessage: string}>(),
    'Cancel Workii Delete':  props<{message: string}>(),
    'Cancel Application Delete':  props<{message: string}>(),
    'Delete Workii Request':  (id: string) => ({ id }),
    'Delete Application Request':  (id: string) => ({ id }),
    'Decrement Applications':  ({applications}: IWorkii) => ({ applications }),
    'Apply To Workii':  (apply: IApplication) => ({apply}),
    'Error Apply To Workii':  props<{errorMessage: string}>(),
  }
})

/* export const loadWorkiis = createAction(
  '[Workii Page] Cargardo workiis',
);

export const createWorkii = createAction(
  '[Workii Page] Crear workii',
  props<{workii: IWorkii}>()
); */

