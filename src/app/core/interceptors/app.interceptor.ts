import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/modules/auth/services';
import { IAppState } from '../state/app.state';
// import { StorageService } from 'src/app/modules/auth/services/storage.service';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

const baseUrl: string = environment.baseUrl;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
	private store = inject(Store<IAppState>);
	private router = inject(Router);
	private authService = inject(AuthService);

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let reqModified;
		const headers: any = {
			'Content-Type': 'application/json'
		};

		const token = localStorage.getItem('authToken');
		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}
		reqModified = req.clone({
			url: baseUrl + req.url,
			setHeaders: headers
		});

		console.log(reqModified, 'reqModified');
		console.log(req.url, 'req.url');

		return next.handle(reqModified).pipe(
			catchError((err: any) => this._cathError(baseUrl, req, err)),
			map((response: any) => {
				return response;
			})
		);
	}

	private _cathError(server: string, req: HttpRequest<any>, error: any): Observable<never> {
		return throwError(error);
	}
}
