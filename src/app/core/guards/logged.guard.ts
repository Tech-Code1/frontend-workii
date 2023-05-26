import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
	private _router = inject(Router);

	canActivate(): boolean {
		const token = localStorage.getItem('authToken');
		if (token) {
			return true;
		}

		this._router.navigateByUrl('auth', { replaceUrl: true });
		return false;
	}
}
