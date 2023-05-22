import { Component } from '@angular/core';

@Component({
	selector: 'app-body',
	templateUrl: './body.component.html',
	styleUrls: ['./body.component.scss']
})
export class BodyComponent {
	id: any = 'create';

	tabChange(ids: any): void {
		this.id = ids;
	}
}
