import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, from, tap } from 'rxjs';
import { UserActions } from '../../../core/state/actions/user.actions';
import { IAppState } from '../../../core/state/app.state';
import { WorkiiActions } from '../../dashboard/workiis/state/actions/workii.actions';
import { ILogin } from '../DTOs/loginDTO';
import { IAuthResponse, IOtp, IUser } from '../interfaces/auth.interface';

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

	get user(): IUser {
		return { ...this._user };
	}

	login({ email, password }: ILogin): Observable<IAuthResponse> {
		const url = `${this.baseUrl}/auth/login`;
		const body = { email, password };

		return this.http.post<IAuthResponse>(url, body);
	}

	validateOtp(otp: string): Observable<IOtp> {
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
