import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concatMap, exhaustMap, from, map, of, switchMap, tap } from 'rxjs';
import { IUser } from 'src/app/modules/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { UiActions } from 'src/app/shared/state/actions/ui.actions';
import Swal from 'sweetalert2';
import { RegisterService } from '../../../modules/auth/services/register.service';
import { UserActions } from '../actions/user.actions';
import { IAppState } from '../app.state';

@Injectable()
export class UserEffects {
	private authServices = inject(AuthService);
	private router = inject(Router);
	private actions$ = inject(Actions);
	private userService = inject(UserService);
	private registerService = inject(RegisterService);
	private store = inject(Store<IAppState>);
	userCurrentId: string = this.userService.getCurrentUser();
	private _user!: IUser;
	loginEmail!: string;
	loginPassword!: string | undefined;

	setUserData(token: string, id: string, email: string, refreshToken: string): void {
		localStorage.setItem('authToken', token!);
		localStorage.setItem('refreshToken', refreshToken!);

		this._user = {
			uiid: id!,
			email: email!
		};
	}

	loginUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.loginUser),
			exhaustMap((action) =>
				this.authServices.login({ email: action.email, password: action.password }).pipe(
					concatMap((resp) => {
						if (resp.ok === true) {
							//this.setUserData(resp.token!, resp.id!, resp.email!, resp.refreshToken!);
							localStorage.setItem('authToken', resp.token!);
							localStorage.setItem('refreshToken', resp.refreshToken!);

							return from([
								UserActions.userFound(),
								UserActions.loginSuccess(resp.token!),
								//UserActions.getUser(resp.id!),
								UiActions.stopLoading()
							]);
						} else {
							return from([UserActions.userNotFound(), UiActions.stopLoading()]);
						}
					}),
					catchError(() => {
						return from([
							UserActions.loginError('Ha ocurrido un error al ingresar a la plataforma'),
							UiActions.stopLoading()
						]);
					})
				)
			)
		)
	);

	navigateAfterLogin$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(UserActions.loginSuccess),
				tap(() => this.router.navigate(['/dashboard/workiis']))
			),
		{ dispatch: false }
	);

	registerUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.registerUser),
			switchMap(() =>
				this.registerService.finishUserCreation().pipe(
					switchMap((createUserResponse) => {
						const token = createUserResponse.token;
						const refreshToken = createUserResponse.refreshToken;
						// Almacena el token en localStorage
						localStorage.setItem('authToken', token);
						localStorage.setItem('refreshToken', refreshToken);

						return [UserActions.registerUserSuccess(), UserActions.registerUserShowMessage()];
					}),
					catchError((err) => {
						this.router.navigate(['/auth']);
						return of(UserActions.registerUserError('Ha ocurrido un error al registrar el usuario'));
					})
				)
			)
		)
	);

	getUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.getUser),
			concatMap((action) =>
				this.userService.getUser(action.id).pipe(
					map((user) => {
						return UserActions.setUser(user);
					}),
					catchError((error) => of(UserActions.getUserError('No se pudo encontrar el usuario')))
				)
			)
		)
	);

	/* loadCurrentUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.loadCurrentUser),
			concatMap(() => {
				const token = localStorage.getItem('authToken');
				if (token) {
					const decodedToken: { id: string } = jwt_decode(token);
					return of(UserActions.currentUserLoaded(decodedToken['id']));
				}
				return of(UserActions.currentUserLoadError('Error al cargar el usuario actual'));
			})
		)
	); */

	registerUserNavigateToDashboard$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(UserActions.registerUserSuccess),
				tap(() => {
					this.router.navigate(['/dashboard/workiis']);
				})
			),
		{ dispatch: false }
	);

	registerUserShowMessage$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(UserActions.registerUserShowMessage),
				tap(() => Swal.fire('Se ha creado el usuario correctamente'))
			),
		{ dispatch: false }
	);

	/* validateToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.validateToken),
      concatMap(() =>
        this.authServices.validateToken().pipe(
          map(resp => {
            console.log(resp, 'response');

            // this.setUserData(resp.token!, resp.id!, resp.email!)
            return UserActions.validateTokenSuccess(resp.ok);
          }),
          catchError((error) => {
            console.log(error, 'ERROR');

            return of(UserActions.validateTokenError('Hubo un error en validar el token'));
          })
        )
      )
    )
  ); */

	/* refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(refreshToken),
      exhaustMap(({ refreshToken }) =>
        this.authService.refreshToken(refreshToken).pipe(
          map(({ accessToken, refreshToken }) => refreshTokenSuccess({ accessToken, refreshToken })),
          catchError((error) => of(refreshTokenFailure({ error })))
        )
      )
    )
  ); */

	validateOtp$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(UserActions.validateOtp),
				concatMap((action) =>
					this.authServices.validateOtp(action.otp).pipe(
						map((resp) => {
							if (resp.ok) {
								this.router.navigateByUrl('/auth/step2');
								return UserActions.validateOtpSuccess(resp);
							} else {
								Swal.fire('Error', 'OTP inválido. Por favor, vuelva a intentarlo.', 'error');
								return UserActions.validateOtpErrorType(resp);
							}
						}),
						catchError(() => {
							return of(UserActions.validateOtpError('Ha ocurrido un error al enviar el OTP'));
						})
					)
				)
			),
		{ dispatch: false }
	);

	notifyApiError$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					UserActions.loginError,
					UserActions.validateOtpError,
					UserActions.registerUserError,
					UserActions.getUserError
				),
				tap((action) => {
					Swal.fire('Error', `${action.errorMessage}`, 'error');
				})
			),
		{ dispatch: false }
	);
}
