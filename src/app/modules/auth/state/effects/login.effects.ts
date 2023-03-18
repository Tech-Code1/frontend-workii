import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';
import { UserService } from 'src/app/modules/auth/services/user.service';

@Injectable()
export class LoginEffects {

  userCurrentId: string = this.userService.getCurrentUser();


  /* notifyApiError$ = createEffect(() => this.actions$.pipe(
    ofType(WorkiiActions.loadError,),
    tap((action) => {
      Swal.fire('Error', `${action.errorMessage}`, 'error');
    })
  ), {dispatch: false}) */

  constructor(
    private actions$: Actions,
    private modalService: SwitchService,
    private userService: UserService,
  ) {
  }
}
