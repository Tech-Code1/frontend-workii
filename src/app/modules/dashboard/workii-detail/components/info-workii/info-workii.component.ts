import { Component, Input } from '@angular/core';
import { IWorkii } from 'src/app/core/models/workii.interface';

@Component({
	selector: 'info-workii',
	templateUrl: './info-workii.component.html',
	styleUrls: ['./info-workii.component.scss']
})
export class InfoWorkiiComponent {
	@Input()
	workii!: IWorkii;

	info: boolean = false;

	shareWorkii(event: Event): void {
		event.stopPropagation();
	}

	infoOpen(): void {
		this.info = !this.info;
	}
}
