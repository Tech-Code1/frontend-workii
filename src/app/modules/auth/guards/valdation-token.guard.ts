import { Injectable, inject } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, first, map, Observable, tap, catchError, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IAppState } from '../../../core/state/app.state';
import { UserActions } from '../../../core/state/actions/user.actions';
import { selectAuthStatus } from 'src/app/core/state/selectors/user.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { last, mergeMap, skipWhile, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValdationTokenGuard implements CanActivate, CanLoad {

  private store = inject(Store<IAppState>)
  private router = inject(Router)

  canActivate(): Observable<boolean> | boolean {
    return this.validateAndNavigate();
  }

  canLoad(): Observable<boolean> | boolean {
    return this.validateAndNavigate();
  }

  private validateAndNavigate() {

    return this.store.select(selectAuthStatus).pipe(
      tap( valid => {
        if(!valid) {
          this.router.navigateByUrl('/auth')
        }
      })
    );
  }
}
