import { Injectable, inject } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { UserActions } from '../state/actions/user.actions';
import { AuthService } from 'src/app/modules/auth/services';
import { EventBusService } from 'src/app/shared/services/event-bus.service';
// import { StorageService } from 'src/app/modules/auth/services/storage.service';
import { EventData } from 'src/app/shared/utils/event.class';
import { IAuthResponse } from 'src/app/modules/auth/interfaces/auth.interface';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private store = inject(Store<IAppState>);
  private authService = inject(AuthService);
  private eventBusService = inject(EventBusService);
  // private storageService = inject(StorageService);

  private isRefreshing = false;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
    });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
            error instanceof HttpErrorResponse &&
            !req.url.includes('/auth') &&
            error.status === 401
          ) {
          // The accessToken has expired. Dispatch the refreshToken action.
          //const refreshToken = this.authService.getRefreshToken();
          //this.store.dispatch(UserActions.refreshToken());
          return this.handle401Error(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (localStorage.getItem('authToken')) {
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