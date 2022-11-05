import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { supportLanguages } from 'src/app/shared/utils/constLanguages';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  langs = supportLanguages;
	clickCount = 1;
	clickCountTwo = 1;
	clickCountThree = 1;
  isMenuOpened: boolean = false;

  sun: string = "../../../../assets/images/svg/icon-sun.svg"
  moon: string = "../../../../assets/images/svg/icon-moon.svg"

	@ViewChild('inputSelect') inputSelect!: ElementRef;
	@ViewChild('contentProfile') contentProfile!: ElementRef;


  constructor(private renderer2: Renderer2,
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    // Whenever the user explicity chooses light mode
    //localStorage.theme = 'light'

    // Whenever the user explicity chooses dark mode
    //localStorage.theme = 'dark'

    // Whenever the user explicity chooses the respect the OS preference
    //localStorage.removeItem('theme')


    if (localStorage['theme'] === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened
  }

  clickedOutside(): void {
    this.isMenuOpened = false;
  }

    toggleDarkMode: boolean = this.document.documentElement.classList.value === "dark";
    mode: string | null = localStorage.getItem("theme")


    darkChange() {
        this.toggleDarkMode = this.document.documentElement.classList.toggle("dark")
        this.mode = this.toggleDarkMode ? localStorage['theme'] ='dark' : localStorage['theme'] ='light'

        console.log(this.mode)
    }
}
