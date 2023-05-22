import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { supportLanguages } from 'src/app/shared/utils/constLanguages';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent {
	langs = supportLanguages;
	clickCount = 1;
	clickCountTwo = 1;
	clickCountThree = 1;
	isMenuOpened: boolean = false;

	@ViewChild('inputSelect') inputSelect!: ElementRef;
	@ViewChild('contentProfile') contentProfile!: ElementRef;

	constructor(private renderer2: Renderer2, private translateService: TranslateService) {}

	toggleMenu(): void {
		this.isMenuOpened = !this.isMenuOpened;
	}

	clickedOutside(): void {
		this.isMenuOpened = false;
	}
}
