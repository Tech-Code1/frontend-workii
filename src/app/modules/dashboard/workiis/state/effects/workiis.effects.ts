import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { WorkiisService } from '../../service/workiis.service';
import { IWokiiState } from '../../../../../core/models/workii.state';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { WorkiiActions } from '../actions/workii.actions';
import { NotificationsService } from '../../../../../core/notifications/notifications.service';

@Injectable()
export class WorkiiEffects {

  isOwner!: boolean[];
  userCurrentId!: string;

  loadWorkiiss$: Observable<{type: string, workiis: IWorkii[]} | {errorMessage: string}> = createEffect(() => this.actions$.pipe(
    ofType(WorkiiActions.loadWorkiis),
    exhaustMap(() => this.workiisService.getWorkiis(20, 0)
      .pipe(
        map(workiis => {

        return  { type: WorkiiActions.listWorkiis.type, workiis }

        }),
        catchError(() => of(WorkiiActions.loadError('Ha ocurrido un error al intentar obtener el listado de los Workiis')))
      ))
    )
  );

  foundWorkiis$ = createEffect(() => this.actions$.pipe(
    ofType(WorkiiActions.listWorkiis),
    tap(action => {
      const foundArray = action.workiis.map(workii => workii.user.id.includes(this.userCurrentId));
      this.isOwner = foundArray
        console.log(this.isOwner);
        return this.isOwner
    })
    ), {dispatch: false}
  );

  notifyApiError$ = createEffect(() => this.actions$.pipe(
    ofType(WorkiiActions.loadError),
    tap(action => this.notificationsService.error(action.errorMessage))
  ), {dispatch: false})

  constructor(
    private actions$: Actions,
    private workiisService: WorkiisService,
    private userService: UserService,
    private notificationsService: NotificationsService
  ) {
    this.userCurrentId = this.userService.getCurrentUser()
  }
}
