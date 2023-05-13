import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from '../../../../state/app.state';
import { selectOneUser } from '../../../../state/selectors/user.selectors';
import { IUserDTO } from '../../../../models/user.interface';
import { UserActions } from 'src/app/core/state/actions/user.actions';
import { WorkiiActions } from 'src/app/modules/dashboard/workiis/state/actions/workii.actions';

@Component({
  selector: 'header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrls: ['./header-dashboard.component.scss']
})
export class HeaderDashboard implements OnInit {

  private router = inject(Router)
  private store = inject(Store<IAppState>)

  user$!: Observable<IUserDTO | null>;
  isMenuOpened: boolean = false;

  ngOnInit(): void {
    this.user$ = this.store.select(selectOneUser)
  }

  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened
  }

  logout() {
    this.router.navigateByUrl('/auth');
    localStorage.removeItem('authToken');
    this.store.dispatch(UserActions.logOut())
    this.store.dispatch(WorkiiActions.logOut())
  }

  clickedOutside(): void {
    this.isMenuOpened = false;
  }
}
