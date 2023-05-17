import { Component } from '@angular/core';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  isMenuOpened: boolean = false;

  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened
  }

  clickedOutside(): void {
    this.isMenuOpened = false;
  }

}
