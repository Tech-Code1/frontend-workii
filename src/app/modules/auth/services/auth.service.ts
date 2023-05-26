import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

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

	private _user!: IUser;

	get user(): IUser {
		return { ...this._user };
	}

	login({ email, password }: ILogin): Observable<IAuthResponse> {
		const url = `/auth/login`;
		const body = { email, password };

		return this.http.post<IAuthResponse>(url, body);
	}

	validateOtp(otp: string): Observable<IOtp> {
		const url = `/auth/validate/otp`;
		const body = { otp };

		return this.http.post<IOtp>(url, body);
	}

	getRefreshToken(): string | null {
		console.log(localStorage.getItem('refreshToken'));

		return localStorage.getItem('refreshToken');
	}

	refreshToken(): Observable<any> {
		const refreshToken = this.getRefreshToken();
		const url = `/auth/refresh-token`;
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
