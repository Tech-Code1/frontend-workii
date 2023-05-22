import { Component, inject } from '@angular/core';
import { IUser } from '../auth/interfaces/auth.interface';
import { AuthService } from '../auth/services/auth.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
	private authService = inject(AuthService);

	get user(): IUser {
		return this.authService.user;
	}
}
