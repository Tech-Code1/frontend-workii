import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of, tap } from 'rxjs';
import { map, exhaustMap, catchError, concatMap } from 'rxjs/operators';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { WorkiisService } from '../../service/workiis.service';
import { WorkiiActions } from '../actions/workii.actions';
import Swal from 'sweetalert2';
import { IWorkiiCreate } from '../../interfaces/workii.interface';
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
        console.log(savedWorkiis);

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

  notifyApiError$ = createEffect(() => this.actions$.pipe(
    ofType(WorkiiActions.loadError, WorkiiActions.errorCreateWorkii),
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
