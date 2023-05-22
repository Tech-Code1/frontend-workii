import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IApplicationUser } from '../../interfaces/workii.interface';

import { FormControl } from '@angular/forms';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { IWorkiiInfo } from '../../workiis.component';

@Component({
	selector: 'workiis-cards',
	templateUrl: './workiis-cards.component.html',
	styleUrls: ['./workiis-cards.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkiisCardsComponent {
	@Input() workiis!: (IWorkii & IWorkiiInfo)[];
	@Input() searchWorkiis!: (IWorkii & IWorkiiInfo)[];
	@Input() applications!: readonly IApplicationUser[];
	@Input() isFilterOpened!: boolean;
	@Input() userCurrentId!: string;
	@Input() searchControl!: FormControl<string>;

	totalPagesListWorkiis: number = 0;
	pagesWorkiis: number[] = [];
	modalSwitch: boolean = false;

	shouldDisplayContent(): boolean | undefined {
		return this.searchWorkiis && this.searchControl.value !== '';
	}

	notDisplayContent(): boolean | undefined {
		return this.searchControl.value === null || this.searchControl.value === '';
	}
}
