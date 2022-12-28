import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../auth/interfaces/auth.interface';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  get user(): IUser {
    return this.authService.user
  }

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }
}
