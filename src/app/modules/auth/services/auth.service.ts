import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { IAuthResponse, IUser } from '../interfaces/auth.interface';
import { catchError, map, of, tap, Observable } from 'rxjs';

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

  setUserData(token: string, id: string, email: string) {
    localStorage.setItem('token', token!);

    this._user = {
      uiid: id!,
      email: email!
    }
  }

  login(email: string, password: string) {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<IAuthResponse>(url, body)
    .pipe(
      tap( resp => {
        if(resp.ok ) {
          this.setUserData(resp.token!, resp.id!, resp.email!)
        }

      }),
      map(resp => resp.ok),
      catchError(err => of(err.error.message))
    )
  }

  validateToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<IAuthResponse>(url, { headers })
    .pipe(
      map(resp => {
        this.setUserData(resp.token!, resp.id!, resp.email!)
        return resp.ok
      }),
      catchError(err => of(false))
    )
  }

  logout() {
    localStorage.removeItem('token');
  }
}
