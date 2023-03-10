import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, firstValueFrom, from, lastValueFrom, Observable, of, tap } from 'rxjs';
import { map, exhaustMap, catchError, concatMap, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { WorkiisService } from '../../service/workiis.service';
import { WorkiiActions } from '../actions/workii.actions';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { IApplicationResponse, IWorkiiCreate } from '../../interfaces/workii.interface';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';

@Injectable()
export class WorkiiEffects {

  loadWorkiiss$: Observable<{type: string, workiis: IWorkii[]} | {errorMessage: string}> = createEffect(() => this.actions$.pipe(
    ofType(WorkiiActions.loadWorkiis),
    exhaustMap(() => this.workiisService.getWorkiis(20, 0)
      .pipe(
        map(workiis => {

        return  { type: WorkiiActions.listWorkiis.type, workiis }

        }),
        catchError(() => {
          return of(WorkiiActions.errorCreateWorkii(
            { errorMessage: 'Ha ocurrido un error al intentar obtener el listado de los Workiis' }
          ));
        })
      ))
    )
  );

  createWorkii$: Observable<{workii: IWorkiiCreate} | { errorMessage: string }> = createEffect(() => this.actions$.pipe(
    ofType(WorkiiActions.createWorkiiSuccess),
    concatMap((action) =>

        this.workiisService.createWorkiis(action.workii).pipe(

      map((savedWorkiis) => {

        this.modalService.$modal.emit(false)

        setTimeout(() => {
          location.reload();
        }, 800)

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
  ), {dispatch: false})


deleteWorkii$: Observable<{id: string} | { errorMessage: string } | {message: string} | {response: IApplicationResponse}> = createEffect(() => this.actions$.pipe(
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
    }) // Esto crea un array con el action y el result
  )),
  mergeMap(({result, action}) => { // Esto usa destructuring para extraer el action y el result del array
    if(result.isConfirmed) {
      this.modalService.$modal.emit(false);
      // Eliminar el Workii del array de datos o actualizar el estado
      Swal.fire({
        icon: 'success',
        text: 'El Workii se ha eliminado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      return of(WorkiiActions.deleteWorkiiSuccess(action.id));
    }
    return of(WorkiiActions.cancelWorkiiDelete({message: 'Has cancelado la acción'}))
  })
))


  notifyApiError$ = createEffect(() => this.actions$.pipe(
    ofType(WorkiiActions.loadError, WorkiiActions.errorCreateWorkii, WorkiiActions.deleteWorkiiError),
    tap((action) => {
      Swal.fire('Error', `${action.errorMessage}`, 'error');
    })
  ), {dispatch: false})

  constructor(
    private actions$: Actions,
    private workiisService: WorkiisService,
    private modalService: SwitchService
  ) {
  }
}
