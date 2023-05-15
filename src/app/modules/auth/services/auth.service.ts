import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { IAuthResponse, IOtp, IUser } from '../interfaces/auth.interface';
import { catchError, map, of, tap, Observable, EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { loginDTO } from '../DTOs/loginDTO';
import { IAppState } from '../../../core/state/app.state';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../core/state/actions/user.actions';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private store = inject(Store<IAppState>)

    constructor(private http: HttpClient) {}

    private baseUrl: string = environment.baseUrl;
    private _user!: IUser;

    get user() {
      return { ...this._user }
    }

    login({email, password} : loginDTO) {

      const url = `${this.baseUrl}/auth/login`;
      const body = { email, password };

      return this.http.post<IAuthResponse>(url, body)
    }

    validateOtp(otp: string) {
      const url = `${this.baseUrl}/auth/validate/otp`;
      const body = { otp };

      return this.http.post<IOtp>(url, body)
    }

    validateToken(): Observable<IAuthResponse> {
      const token = localStorage.getItem('authToken');

      if(!token) {
        console.log('por acá paso');
        return EMPTY;
      }
        const url = `${this.baseUrl}/auth/renew`;
        const headers = new HttpHeaders()
        .set('Authorization', token);


        return this.http.get<IAuthResponse>(url, { headers })
    }
  }
