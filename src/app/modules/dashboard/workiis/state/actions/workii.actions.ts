import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IWorkii } from 'src/app/core/models/workii.interface';
import {
	IApplicationCreateUser,
	IApplicationResponse,
	IApplicationUser,
	IPagination,
	IUsersApplicationResponse,
	IWorkiiCreate
} from '../../interfaces/workii.interface';

export const WorkiiActions = createActionGroup({
	source: 'Workii Page',
	events: {
		'Log Out': emptyProps(),
		'Load workiis': ({ limit, offset }: IPagination) => ({ limit, offset }),
		'Load Applications': (id: string) => ({ id }),
		'List workiis': (workiis: readonly IWorkii[], totalResults: number) => ({ workiis, totalResults }),
		'List Applications Workiis': (applications: readonly IApplicationUser[]) => ({ applications }),
		'Load Error': props<{ errorMessage: string }>(),
		'Create Workii Success': (workii: IWorkiiCreate) => ({ workii }),
		'Error Create Workii': props<{ errorMessage: string }>(),
		'Delete Workii Success': (id: string) => ({ id }),
		'Delete Application Success': (id: string, workii: string) => ({ id, workii }),
		'Delete Workii Success Response': (response: IApplicationResponse) => ({ response }),
		'Delete Workii Error': props<{ errorMessage: string }>(),
		'Delete Application Error': props<{ errorMessage: string }>(),
		'Load Application Error': props<{ errorMessage: string }>(),
		'Cancel Workii Delete': props<{ message: string }>(),
		'Cancel Application Delete': props<{ message: string }>(),
		'Delete Workii Request': (id: string) => ({ id }),
		'Delete Application Request': (id: string, workii: string) => ({ id, workii }),
		//'Decrement Applications':  ({applications}: IWorkii) => ({ applications }),
		//'Apply To Workii Request':  (response: IApplicationResponse) => ({response}),
		'Apply To Workii': ({ user, workii }: IApplicationCreateUser) => ({ user: user.id, workii: workii.id }),
		'Apply Workii Request': (user: string, workii: string) => ({ user, workii }),
		'Cancel Apply': props<{ errorMessage: string }>(),
		'Error Apply To Workii': props<{ errorMessage: string }>(),
		//TODO: Esto se podria separar
		'Load Workii': props<{ slug: string }>(),
		'Load Workii Succes': props<{ workii: IWorkii }>(),
		'Load Workii Error': props<{ errorMessage: string }>(),
		'Load Users Apply': (workii: string, { limit, offset }: IPagination) => ({ workii, limit, offset }),
		'Load Users Apply Success': (workiiUsersApplications: readonly IUsersApplicationResponse[]) => ({
			workiiUsersApplications
		}),
		'Load Users Apply Error': props<{ errorMessage: string }>(),
		'Search Workii': (searchTerm: string, { limit, offset }: IPagination) => ({ searchTerm, limit, offset }),
		'Search Workii Success': (workiis: IWorkii[], totalSearchResults: number) => ({
			workiis,
			totalSearchResults,
			notFound: false
		}),
		'Search Workii Not Found': () => ({ notFound: true }),
		'Search Workii Fail': props<{ errorMessage: string }>(),
		'Update Search Term': props<{ searchTerm: string }>()
	}
});

/* export const loadWorkiis = createAction(
  '[Workii Page] Cargardo workiis',
);

export const createWorkii = createAction(
  '[Workii Page] Crear workii',
  props<{workii: IWorkii}>()
); */
