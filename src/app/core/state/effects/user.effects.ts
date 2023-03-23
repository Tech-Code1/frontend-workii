import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { catchError, concat, concatMap, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserActions } from '../actions/user.actions';
import { Router } from '@angular/router';
import { IUser } from 'src/app/modules/auth/interfaces/auth.interface';
import { UiActions } from 'src/app/shared/state/actions/ui.actions';
import { exhaustMap, mergeMap } from 'rxjs/operators';
import { IAppState } from '../app.state';
import { Store } from '@ngrx/store';
import { selectPassword } from '../selectors/user.selectors';

@Injectable()
export class UserEffects {

  private authServices = inject(AuthService);
  private router = inject(Router);
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  //private store = inject(Store<IAppState>);
  userCurrentId: string = this.userService.getCurrentUser();
  private _user!: IUser;
  loginEmail!: string;
  loginPassword!: string | undefined;

  setUserData(token: string, id: string, email: string) {
    localStorage.setItem('token', token!);

    this._user = {
      uiid: id!,
      email: email!
    }
  }

  loginUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loginUser),
    concatMap((action) =>
        this.authServices.login({email: action.email, password: action.password}).pipe(
          switchMap( resp => {
            if(resp.ok === true) {

              this.setUserData(resp.token!, resp.id!, resp.email!)
              this.router.navigate(['/dashboard/workiis']);


              return from([
                UserActions.userFound(),
                UiActions.stopLoading()
              ]);

            } else {

              return from([
                UserActions.userNotFound(),
                UiActions.stopLoading()
              ]);
            }
          }),
          catchError(() => {
            return from([
              UserActions.loginError('Ha ocurrido un error al ingresar a la plataforma'),
              UiActions.stopLoading()
            ]);
          })
        ))
  ));

  validateOtp$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.validateOtp),
    concatMap((action) =>

        this.authServices.validateOtp(action.otp).pipe(
          map( resp => {
            if (resp.ok) {
              this.router.navigateByUrl('/auth/step2')
              return UserActions.validateOtpSuccess(resp)
            } else {

              Swal.fire('Error', "OTP inválido. Por favor, vuelva a intentarlo.", 'error')
              return UserActions.validateOtpErrorType(resp)
            }
          }),
          catchError(() => {
            return of(UserActions.validateOtpError(
              'Ha ocurrido un error al enviar el OTP'
            ));
          })
        ))
  ), {dispatch: false})


  notifyApiError$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loginError, UserActions.validateOtpError),
    tap((action) => {
      Swal.fire('Error', `${action.errorMessage}`, 'error');
    })
  ), {dispatch: false})

}
