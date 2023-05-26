import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class UnloggeddGuard implements CanActivate {
	private _router = inject(Router);

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const token = localStorage.getItem('authToken');
		if (!token) {
			return true;
		}

		this._router.navigateByUrl('/', { replaceUrl: true });
		return false;
	}
}
