import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { supportLanguages } from 'src/app/shared/utils/constLanguages';

@Component({
  selector: 'app-select-lang',
  templateUrl: './select-lang.component.html',
  styleUrls: ['./select-lang.component.scss']
})
export class SelectLangComponent implements OnInit {

  langs = supportLanguages;
	clickCount = 1;
	clickCountTwo = 1;

  @Input() titleLang!: string;

  @Input() isLayoutHidden!: boolean;

	@ViewChild('select') select!: ElementRef;
	@ViewChild('optionsLang') optionsLang!: ElementRef;
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


    @HostListener("document:click", ["$event"])
    outClickHandler(e: MouseEvent) {
      const optionsLang = this.optionsLang.nativeElement;
      const navBarSelect = this.select.nativeElement;
      const arrow = this.arrow.nativeElement;


      const clic = e.target;
      if (optionsLang.contains(clic) && this.clickCountTwo === 1) {

        optionsLang.style.display = "flex";
        this.clickCountTwo += 1

        if (this.clickCountTwo === 2) {

        optionsLang.style.display = "none";
        this.renderer2.removeClass(navBarSelect, 'active');
        this.renderer2.removeClass(optionsLang, 'active');
        this.renderer2.removeClass(arrow, 'icon-rotate')

        this.clickCountTwo = 1
        this.clickCount = 1;
      }

      } else if (navBarSelect.contains(clic) && this.clickCount == 1) {

        optionsLang.style.display = "flex";
        this.renderer2.addClass(navBarSelect, 'active');
        this.renderer2.addClass(optionsLang, 'active');
        this.renderer2.addClass(optionsLang, 'flex-column');
        this.renderer2.addClass(arrow, 'icon-rotate-two')

        this.clickCount += 1

      }  else if (navBarSelect.contains(clic) && this.clickCount == 2) {

        const select = this.select.nativeElement;
          this.renderer2.removeClass(select, 'active');
          const options = this.optionsLang.nativeElement;
          this.renderer2.removeClass(options, 'active');
          this.renderer2.removeClass(arrow, 'icon-rotate-two')
        options.style.display = "none";

          this.clickCount = 1;

      } else {

        optionsLang.style.display = "none";
        this.renderer2.removeClass(navBarSelect, 'active');
        this.renderer2.removeClass(optionsLang, 'active');
        this.clickCount = 1;
        this.renderer2.removeClass(arrow, 'icon-rotate-two')
      }
    }
}
