import { Component } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent  {

  titleLang: string = 'Language'
  isLayoutHidden: boolean = false;


  toggleLayoutHidden(): void {
    this.isLayoutHidden = !this.isLayoutHidden;
  }
}
