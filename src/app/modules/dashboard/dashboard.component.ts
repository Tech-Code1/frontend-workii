import { Component, OnInit, inject, AfterViewInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UiActions } from 'src/app/shared/state/actions/ui.actions';
import { IUser } from '../auth/interfaces/auth.interface';
import { AuthService } from '../auth/services/auth.service';
import { UserActions } from '../../core/state/actions/user.actions';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/core/state/app.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  //private store = inject(Store<IAppState>)
  private authService = inject(AuthService)

  get user(): IUser {
    return this.authService.user
  }

  ngOnInit(): void {
    //this.store.dispatch(UserActions.validateToken())
  }

}
