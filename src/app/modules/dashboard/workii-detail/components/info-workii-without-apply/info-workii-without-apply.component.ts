import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { WorkiiActions } from '../../../workiis/state/actions/workii.actions';

@Component({
	selector: 'info-workii-without-apply',
	templateUrl: './info-workii-without-apply.component.html',
	styleUrls: ['./info-workii-without-apply.component.scss']
})
export class InfoWorkiiWithoutApplyComponent {
	@Input()
	workii!: IWorkii | null;

	@Input()
	userCurrentId!: string;

	constructor(private store: Store) {}

	shareWorkii(event: Event): void {
		event.stopPropagation();
	}

	async applyWorkii(): Promise<void> {
		this.store.dispatch(WorkiiActions.applyWorkiiRequest(this.userCurrentId, this.workii?.id!));
	}
}
