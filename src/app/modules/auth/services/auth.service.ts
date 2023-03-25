import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { IAuthResponse, IOtp, IUser } from '../interfaces/auth.interface';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { loginDTO } from '../DTOs/loginDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: IUser;
  loginEmail!: string;
  loginPassword!: string;

  get user() {
    return { ...this._user }
  }

  constructor( private http: HttpClient, private router: Router, ) { }

  setUserData(token: string, id: string, email: string) {
    localStorage.setItem('token', token!);

    this._user = {
      uiid: id!,
      email: email!
    }
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
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<IAuthResponse>(url, { headers })
  }

  logout() {
    localStorage.removeItem('token');
  }
}
