import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { IApplicationUser } from '../../../workiis/interfaces/workii.interface';

@Component({
	selector: 'info-workii',
	templateUrl: './info-workii.component.html',
	styleUrls: ['./info-workii.component.scss']
})
export class InfoWorkiiComponent {
	@Input()
	workii!: IWorkii;

	info: boolean = false;

	constructor() {}

	ngOnInit(): void {}

	shareWorkii(event: Event) {
		event.stopPropagation();
	}

	infoOpen() {
		this.info = !this.info;
	}
}
