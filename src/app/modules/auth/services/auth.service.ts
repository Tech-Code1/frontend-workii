import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { IAuthResponse, IUser } from '../interfaces/auth.interface';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: IUser;

  get user() {
    return { ...this._user }
  }

  constructor( private http: HttpClient ) { }

  login(email: string, password: string) {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<IAuthResponse>(url, body)
    .pipe(
      tap( resp => {
        if(resp.ok ) {
          this._user = {
            uiid: resp.id!,
            email: resp.email!
          }
        }

      }),
      map(resp => resp.ok),
      catchError(err => of(err.error.message))
    )

  }
}
