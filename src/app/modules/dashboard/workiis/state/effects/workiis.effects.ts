import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, firstValueFrom, from, lastValueFrom, Observable, of, tap } from 'rxjs';
import { map, exhaustMap, catchError, concatMap, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { WorkiisService } from '../../service/workiis.service';
import { WorkiiActions } from '../actions/workii.actions';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { IApplicationResponse, IApplicationUser, IWorkiiCreate, IApplication } from '../../interfaces/workii.interface';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { IAppState } from '../../../../../core/state/app.state';
import { Action, Store } from '@ngrx/store';
import { UiActions } from 'src/app/shared/state/actions/ui.actions';

@Injectable()
export class WorkiiEffects {

  private store = inject(Store<IAppState>)
  userCurrentId: string = this.userService.getCurrentUser();

  loadWorkiis$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkiiActions.loadWorkiis),
      tap(() => this.store.dispatch(UiActions.isLoading())),
      mergeMap(({ limit, offset }) =>
        this.workiisService.getWorkiis({ limit, offset }).pipe(
          mergeMap((workiis) =>
            of(
              { type: WorkiiActions.listWorkiis.type, workiis },
              UiActions.stopLoading()
            )
          ),
          catchError(() =>
            of(
              UiActions.stopLoading(),
              WorkiiActions.errorCreateWorkii({
                errorMessage:
                  'Ha ocurrido un error al intentar obtener el listado de los Workiis',
              })
            )
          )
        )
      )
    )
  );

  loadWorkii$ = createEffect(() => this.actions$.pipe(
    ofType(WorkiiActions.loadWorkii),
    switchMap((action) => this.workiisService.getWorkii(action.slug)
      .pipe(
        map(workii => {
          return WorkiiActions.loadWorkiiSucces({ workii })

        }),
        catchError(() => {
          return of(WorkiiActions.loadWorkiiError(
            { errorMessage: 'Ha ocurrido un error al intentar obtener el workii' }
          ));
        })
      ))
  )
  );

  loadUsersApply$ = createEffect(() => this.actions$.pipe(
    ofType(WorkiiActions.loadUsersApply),
    switchMap((action) => this.workiisService.getUsersApplyWorkii(action.workii, { limit: action.limit, offset: action.offset })
      .pipe(
        map(usersApply => {

          return WorkiiActions.loadUsersApplySuccess(usersApply)

        }),
        catchError(() => {
          return of(WorkiiActions.loadUsersApplyError(
            { errorMessage: 'Ha ocurrido un error al intentar obtener la lista de usuarios que han aplicado a este workii' }
          ));
        })
      ))
  )
  );

  loadApplications$: Observable<{ type: string, applications: IApplicationUser[] } | { errorMessage: string }> = createEffect(() => this.actions$.pipe(
    ofType(WorkiiActions.loadApplications),
    exhaustMap(() => this.workiisService.getAllApplicationsWorkiiByUser(this.userCurrentId, { limit: 10, offset: 0 })
      .pipe(
        map(applications => {

          return { type: WorkiiActions.listApplicationsWorkiis.type, applications }

        }),
        catchError(() => {
          return of(WorkiiActions.loadApplicationError(
            { errorMessage: 'Ha ocurrido un error al cargar las aplicaciones' }
          ));
        })
      ))
  )
  );

  searchWorkiis$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkiiActions.searchWorkii),
      // Inicia el indicador de carga
      tap(() => this.store.dispatch(UiActions.isLoading())),
      switchMap((action) =>
        this.workiisService.searchWorkiis(action.searchTerm!, action.limit, action.offset).pipe(
          mergeMap((workiis) => {
            // Detén el indicador de carga en caso de éxito
            if (workiis.length === 0) {
              return [UiActions.stopLoading(), WorkiiActions.searchWorkiiNotFound()];
            } else {
              return [UiActions.stopLoading(), WorkiiActions.searchWorkiiSuccess(workiis)];
            }
          }),
          catchError(() => {
            // Detén el indicador de carga en caso de error
            return of(UiActions.stopLoading(), WorkiiActions.searchWorkiiFail(
              { errorMessage: 'Ha ocurrido un error al cargar los workiis' }
            ));
          })
        )
      )
    )
  );

  createWorkii$: Observable<{ workii: IWorkiiCreate } | { errorMessage: string }> = createEffect(() => this.actions$.pipe(
    ofType(WorkiiActions.createWorkiiSuccess),
    concatMap((action) =>

      this.workiisService.createWorkiis(action.workii).pipe(

        map((savedWorkiis) => {

          this.modalService.$modal.emit(false)

          Swal.fire({
            icon: 'success',
            text: 'El workii se ha creado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          return WorkiiActions.createWorkiiSuccess(savedWorkiis)
        }),

        catchError(() => {
          return of(WorkiiActions.errorCreateWorkii(
            { errorMessage: 'Ha ocurrido un error al intentar crear el Workii' }
          ));
        })
      ))
  ), { dispatch: false })


  deleteWorkii$: Observable<{ id: string } | { errorMessage: string } | { message: string } | { response: IApplicationResponse }> = createEffect(() => this.actions$.pipe(
    ofType(WorkiiActions.deleteWorkiiRequest),
    switchMap((action) => from(Swal.fire({
      title: '¿ Estas seguro de eliminar el Workii ?',
      text: "No podras revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar workii!'
    })).pipe(
      map(result => {
        return { result, action }
      })
    )),
    mergeMap(({ result, action }) => {
      if (result.isConfirmed) {
        this.modalService.$modal.emit(false);
        // Eliminar el Workii del array de datos o actualizar el estado
        Swal.fire({
          icon: 'success',
          text: 'El Workii se ha eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        });

        return this.workiisService.deleteWorkii(action.id).pipe(
          map(() => WorkiiActions.deleteWorkiiSuccess(action.id)),
          catchError(() => {
            return of(WorkiiActions.deleteWorkiiError({
              errorMessage: 'No se ha podido eliminar el Workii, ha ocurrido un error'
            }))
          })
        )
      }
      return of(WorkiiActions.cancelWorkiiDelete({ message: 'Has cancelado la acción' }))
    })
  ))


  applyToWorkii$ = createEffect(() => this.actions$.pipe(
    ofType(WorkiiActions.applyWorkiiRequest),
    switchMap((action) => from(Swal.fire({
      title: '¿ Estas seguro que deseas aplicar al Workii ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, aplicar'
    })).pipe(
      map(result => {
        return { result, action }
      })
    )),
    mergeMap(({ result, action }) => {
      if (result.isConfirmed) {
        this.modalService.$modal.emit(false);
        // Eliminar el Workii del array de datos o actualizar el estado
        Swal.fire({
          icon: 'success',
          text: 'El Workii se ha eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        });

        return this.workiisService.applyToWorkii({ user: action.user, workii: action.workii }).pipe(
          map((result) => {
            return WorkiiActions.applyToWorkii({ user: { id: action.user }, workii: { id: action.workii } });
          }),
          catchError(() => {
            return of(WorkiiActions.errorApplyToWorkii({
              errorMessage: 'No se ha podido aplicar al Workii, ha ocurrido un error'
            }))
          })
        )
      } else if (result.dismiss === Swal.DismissReason.backdrop || result.dismiss === Swal.DismissReason.esc || result.dismiss === Swal.DismissReason.close) {
        // El usuario cerró el cuadro de confirmación sin seleccionar ninguna opción
        return of(WorkiiActions.cancelApplicationDelete({ message: 'Has cerrado el cuadro de confirmación sin seleccionar ninguna opción' }))
      }
      return of(WorkiiActions.cancelApply({ errorMessage: 'Has cancelado la acción' }))
    })
  ))

  removeApplication$: Observable<{ id: string, workii: string } | { errorMessage: string } | { message: string } | { response: IApplicationResponse }> = createEffect(() => this.actions$.pipe(
    ofType(WorkiiActions.deleteApplicationRequest),
    switchMap((action) => from(Swal.fire({
      title: '¿ Estas seguro que deseas abandonar el workii ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, abandonar'
    })).pipe(
      map(result => {
        return { result, action }
      })
    )),
    mergeMap(({ result, action }) => {
      if (result.isConfirmed) {
        this.modalService.$modal.emit(false);
        // Eliminar el Workii del array de datos o actualizar el estado
        Swal.fire({
          icon: 'success',
          text: 'Has abandondado correctamente el workii',
          showConfirmButton: false,
          timer: 1500
        });

        console.log(action.id, action.workii);


        return this.workiisService.removeApplication(action.id, action.workii).pipe(
          map(() => WorkiiActions.deleteApplicationSuccess(action.id, action.workii)),
          catchError(() => {
            return of(WorkiiActions.deleteApplicationError({
              errorMessage: 'No has podido abandonar el Workii, ha ocurrido un error'
            }))
          })
        )
      } else if (result.dismiss === Swal.DismissReason.backdrop || result.dismiss === Swal.DismissReason.esc || result.dismiss === Swal.DismissReason.close) {
        // El usuario cerró el cuadro de confirmación sin seleccionar ninguna opción
        return of(WorkiiActions.cancelApplicationDelete({ message: 'Has cerrado el cuadro de confirmación sin seleccionar ninguna opción' }))
      }
      return of(WorkiiActions.cancelApplicationDelete({ message: 'Has cancelado la acción' }))
    })
  ))


  notifyApiError$ = createEffect(() => this.actions$.pipe(
    ofType(
      WorkiiActions.loadError,
      WorkiiActions.errorCreateWorkii,
      WorkiiActions.deleteWorkiiError,
      WorkiiActions.loadApplicationError,
      WorkiiActions.deleteApplicationError,
      WorkiiActions.errorApplyToWorkii,
      WorkiiActions.loadUsersApplyError,
      WorkiiActions.loadWorkiiError,
    ),
    tap((action) => {
      Swal.fire('Error', `${action.errorMessage}`, 'error');
    })
  ), { dispatch: false })

  constructor(
    private actions$: Actions,
    private workiisService: WorkiisService,
    private modalService: SwitchService,
    private userService: UserService,
  ) {
  }
}
