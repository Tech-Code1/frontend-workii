import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services';
import { IUserDto } from '../../../../models/user.interface';
import { IAppState } from '../../../../state/app.state';
import { selectOneUser } from '../../../../state/selectors/user.selectors';

@Component({
	selector: 'header-dashboard',
	templateUrl: './header-dashboard.component.html',
	styleUrls: ['./header-dashboard.component.scss']
})
export class HeaderDashboardComponent implements OnInit {
	private authService = inject(AuthService);
	private store = inject(Store<IAppState>);

	user$!: Observable<IUserDto | null>;
	isMenuOpened: boolean = false;

	ngOnInit(): void {
		this.user$ = this.store.select(selectOneUser);
	}

	toggleMenu(): void {
		this.isMenuOpened = !this.isMenuOpened;
	}

	logout(): void {
		this.authService.logout().subscribe();
	}

	clickedOutside(): void {
		this.isMenuOpened = false;
	}
}
