import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { IAuthResponse, IOtp, IUser } from '../interfaces/auth.interface';
import { catchError, map, of, tap, Observable, EMPTY, from } from 'rxjs';
import { Router } from '@angular/router';
import { loginDTO } from '../DTOs/loginDTO';
import { IAppState } from '../../../core/state/app.state';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../core/state/actions/user.actions';
import jwt_decode from 'jwt-decode';
import { WorkiiActions } from '../../dashboard/workiis/state/actions/workii.actions';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private store = inject(Store<IAppState>);
	private http = inject(HttpClient);
	private router = inject(Router);

	headers: HttpHeaders;
	private baseUrl: string = environment.baseUrl;
	private _user!: IUser;

	constructor() {
		// Obtener el token de autorización
		const token = localStorage.getItem('authToken');

		// Crear el encabezado de la solicitud HTTP
		this.headers = new HttpHeaders({
			Authorization: `${token}`
		});
	}

	get user() {
		return { ...this._user };
	}

	login({ email, password }: loginDTO) {
		const url = `${this.baseUrl}/auth/login`;
		const body = { email, password };

		return this.http.post<IAuthResponse>(url, body);
	}

	validateOtp(otp: string) {
		const url = `${this.baseUrl}/auth/validate/otp`;
		const body = { otp };

		return this.http.post<IOtp>(url, body);
	}

	/* validateToken(): Observable<IAuthResponse> {
      const url = `${this.baseUrl}/auth/revalidate`;

      return this.http.get<IAuthResponse>(url, { headers: this.headers });
    } */

	getRefreshToken(): string | null {
		console.log(localStorage.getItem('refreshToken'));

		return localStorage.getItem('refreshToken');
	}

	refreshToken(): Observable<any> {
		const refreshToken = this.getRefreshToken();
		const url = `${this.baseUrl}/auth/refresh-token`;
		const body = { refreshToken };

		return this.http.post(url, body);
	}

	logout(): Observable<any> {
		return from(this.router.navigateByUrl('/auth')).pipe(
			tap(() => {
				localStorage.removeItem('authToken');
				localStorage.removeItem('refreshToken');
				this.store.dispatch(UserActions.logOut());
				this.store.dispatch(WorkiiActions.logOut());
			})
		);
	}
}
