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

	@ViewChild('inputSelect') inputSelect!: ElementRef;
	@ViewChild('contentProfile') contentProfile!: ElementRef;

	constructor(private renderer2: Renderer2, private translateService: TranslateService) {}

	ngOnInit(): void {
		// Whenever the user explicity chooses light mode
		//localStorage.theme = 'light'
		// Whenever the user explicity chooses dark mode
		//localStorage.theme = 'dark'
		// Whenever the user explicity chooses the respect the OS preference
		//localStorage.removeItem('theme')
	}

	toggleMenu() {
		this.isMenuOpened = !this.isMenuOpened;
	}

	clickedOutside(): void {
		this.isMenuOpened = false;
	}
}
