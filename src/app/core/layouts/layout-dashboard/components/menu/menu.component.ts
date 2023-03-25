import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IAppState } from '../../../../state/app.state';
import { UserActions } from '../../../../state/actions/user.actions';
import { WorkiiActions } from 'src/app/modules/dashboard/workiis/state/actions/workii.actions';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent  {

  private store = inject(Store<IAppState>)
  private router = inject(Router)

  logout() {
    this.router.navigateByUrl('/auth');
    localStorage.removeItem('token');
    this.store.dispatch(UserActions.logOut())
    this.store.dispatch(WorkiiActions.logOut())
  }
}
