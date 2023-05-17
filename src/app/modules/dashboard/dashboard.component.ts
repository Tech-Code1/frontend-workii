import { Component, OnInit, inject } from '@angular/core';
import { IUser } from '../auth/interfaces/auth.interface';
import { AuthService } from '../auth/services/auth.service';

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
