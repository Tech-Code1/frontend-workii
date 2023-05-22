import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
@Component({
	selector: 'dark-mode',
	template: `
		<div
			class="rounded-md bg-gray-lighter mr-2 lg:ml-0 dark:bg-black-alternative h-12 w-12 flex justify-center items-center cursor-pointer border-2 border-transparent hover:border-primary-blueNeutral"
			(click)="darkChange()"
		>
			<img
				class="h-8 w-auto"
				[src]="mode === 'dark' ? moon : sun"
				[alt]="mode === 'dark' ? 'icon-moon' : 'icon-soon'"
			/>
		</div>
	`
})
export class DarkModeComponent implements OnInit {
	sun: string = '../../../../assets/images/svg/icon-sun.svg';
	moon: string = '../../../../assets/images/svg/icon-moon.svg';
	toggleDarkMode: boolean = this.document.documentElement.classList.value === 'dark';
	mode: string | null = localStorage.getItem('theme');

	constructor(@Inject(DOCUMENT) private document: Document) {}

	ngOnInit(): void {
		if (
			localStorage['theme'] === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	darkChange(): void {
		this.toggleDarkMode = this.document.documentElement.classList.toggle('dark');
		this.mode = this.toggleDarkMode ? (localStorage['theme'] = 'dark') : (localStorage['theme'] = 'light');
	}
}
