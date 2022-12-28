import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent  {

  constructor(private router: Router,
    private authService: AuthService) { }


  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }
}
