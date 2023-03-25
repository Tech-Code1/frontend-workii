import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from '../../../../state/app.state';
import { selectOneUser } from '../../../../state/selectors/user.selectors';
import { IUserDTO } from '../../../../models/user.interface';

@Component({
  selector: 'header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrls: ['./header-dashboard.component.scss']
})
export class HeaderDashboard implements OnInit {

  private store = inject(Store<IAppState>)

  user$!: Observable<IUserDTO | null>;

  constructor(
    private router:Router,
    ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectOneUser)
  }

}
