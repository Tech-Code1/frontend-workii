import { Injectable, inject } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ValdationTokenGuard implements CanActivate, CanLoad {
	private router = inject(Router);

	canActivate(): Observable<boolean> | boolean {
		return this.validateAndNavigate();
	}

	canLoad(): Observable<boolean> | boolean {
		return this.validateAndNavigate();
	}

	private validateAndNavigate(): boolean {
		const valid = Boolean(localStorage.getItem('authToken'));
		if (!valid) {
			this.router.navigateByUrl('/auth');
		}

		return valid;
	}
}
