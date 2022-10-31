import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { supportLanguages } from 'src/app/shared/utils/constLanguages';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {

  langs = supportLanguages;
	clickCount = 1;
	clickCountTwo = 1;

  isMenuOpened: boolean = false;

  sun: string = "../../../../assets/images/svg/icon-sun.svg"
  moon: string = "../../../../assets/images/svg/icon-moon.svg"
  
	@ViewChild('select') select!: ElementRef;
	@ViewChild('options') options!: ElementRef;
	@ViewChild('contentSelect') contentSelect!: ElementRef;
	@ViewChild('inputSelect') inputSelect!: ElementRef;
	@ViewChild('arrow') arrow!: ElementRef;

  lang = [
		{
			languaje: 'en',
			img: './assets/images/svg/icon-en.svg',
			description: 'icon flag USA',
		},
		{
			languaje: 'es',
			img: './assets/images/svg/icon-es.svg',
			description: 'icon flag Spain',
		},
	];

  constructor(
    private renderer2: Renderer2,
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) { }


  ngOnInit(): void {

    if (localStorage['theme'] === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }


  selectLang(lang: any) {
    this.translateService.use(lang);
  }
  
    reciveData(e: any) {
      e.preventDefault();
      const contentSelect = this.contentSelect.nativeElement;
      const arrow = this.arrow.nativeElement;
      contentSelect.innerHTML = e.currentTarget.innerHTML;

      this.renderer2.removeClass(arrow, 'icon-rotate-two')
  
      let inputSelect = this.inputSelect.nativeElement;
      inputSelect.value =
        e.currentTarget.querySelector('.title-lang').innerText;
    }

    toggleMenu() {
      this.isMenuOpened = !this.isMenuOpened
    }

    clickedOutside(): void {
      this.isMenuOpened = false;
    }
  
    @HostListener("document:click", ["$event"])
    outClickHandler(e: MouseEvent) {
      const options = this.options.nativeElement;
      const navBarSelect = this.select.nativeElement;
      const arrow = this.arrow.nativeElement;
  
  
      const clic = e.target;
      if (options.contains(clic) && this.clickCountTwo === 1) {
  
        options.style.display = "flex";
        this.clickCountTwo += 1
  
        if (this.clickCountTwo === 2) {
  
        options.style.display = "none";
        this.renderer2.removeClass(navBarSelect, 'active');
        this.renderer2.removeClass(options, 'active');
        this.renderer2.removeClass(arrow, 'icon-rotate') 

        this.clickCountTwo = 1
        this.clickCount = 1;
      }
  
      } else if (navBarSelect.contains(clic) && this.clickCount == 1) {
  
        options.style.display = "flex";
        this.renderer2.addClass(navBarSelect, 'active');
        this.renderer2.addClass(options, 'active');
        this.renderer2.addClass(options, 'flex-column');
        this.renderer2.addClass(arrow, 'icon-rotate-two') 
  
        this.clickCount += 1
  
      }  else if (navBarSelect.contains(clic) && this.clickCount == 2) {
  
        const select = this.select.nativeElement;
          this.renderer2.removeClass(select, 'active');
          const options = this.options.nativeElement;
          this.renderer2.removeClass(options, 'active');
          this.renderer2.removeClass(arrow, 'icon-rotate-two') 
        options.style.display = "none";
  
          this.clickCount = 1;
  
      } else {
  
        options.style.display = "none";
        this.renderer2.removeClass(navBarSelect, 'active');
        this.renderer2.removeClass(options, 'active');
        this.clickCount = 1;
        this.renderer2.removeClass(arrow, 'icon-rotate-two') 
      }
    }

    toggleDarkMode: boolean = this.document.documentElement.classList.value === "dark";
    mode: string | null = localStorage.getItem("theme")
    

    darkChange() {
        this.toggleDarkMode = this.document.documentElement.classList.toggle("dark")
        this.mode = this.toggleDarkMode ? localStorage['theme'] ='dark' : localStorage['theme'] ='light'
        
        console.log(this.mode)
    }
}
