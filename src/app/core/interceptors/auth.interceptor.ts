import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/services';
import { EventBusService } from 'src/app/shared/services/event-bus.service';
import { IAppState } from '../state/app.state';
// import { StorageService } from 'src/app/modules/auth/services/storage.service';
import { Router } from '@angular/router';
import { IAuthResponse } from 'src/app/modules/auth/interfaces/auth.interface';
import { EventData } from 'src/app/shared/utils/event.class';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private store = inject(Store<IAppState>);
	private router = inject(Router);
	private authService = inject(AuthService);
	private eventBusService = inject(EventBusService);
	// private storageService = inject(StorageService);

	private isRefreshing = false;

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		req = req.clone({
			withCredentials: true
		});

		return next.handle(req).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error instanceof HttpErrorResponse && !req.url.includes('/auth') && error.status === 401) {
					return this.handle401Error(req, next);
				}
				return throwError(() => error);
			})
		);
	}

	private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (!this.isRefreshing) {
			this.isRefreshing = true;

			const authToken = localStorage.getItem('authToken');
			const refreshToken = localStorage.getItem('refreshToken');

			if (authToken && refreshToken) {
				return this.authService.refreshToken().pipe(
					switchMap((resp: IAuthResponse) => {
						localStorage.setItem('authToken', resp.token!);

						const newRequest = request.clone({
							headers: request.headers.set('Authorization', `Bearer ${resp.token}`)
						});

						this.isRefreshing = false;

						return next.handle(newRequest);
					}),
					catchError((error) => {
						this.isRefreshing = false;

						if (error.status == '403') {
							this.eventBusService.emit(new EventData('logout', null));
						}

						this.router.navigate(['/auth']);

						return throwError(() => error);
					})
				);
			}
		}

		return next.handle(request);
	}
}

/* export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
]; */
