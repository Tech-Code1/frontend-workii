import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { SwitchService } from 'src/app/modules/auth/services';
import { IApplicationUser } from '../../interfaces/workii.interface';
import { ToggleLayoutService } from '../../service/toggleLayoutService.service';
import { IWorkiiInfo } from '../../workiis.component';

@Component({
	selector: 'workiis-content',
	templateUrl: './workiis-content.component.html',
	styleUrls: ['./workiis-content.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkiisContentComponent implements OnInit {
	private modalService = inject(SwitchService);
	public toggleLayoutService = inject(ToggleLayoutService);

	@Input() workiis!: (IWorkii & IWorkiiInfo)[];
	@Input() applications!: readonly IApplicationUser[];
	@Input() userCurrentId!: string;
	@Input() isFilterOpened!: boolean;

	toggleLayout$!: Observable<boolean>;
	applicationId!: string;
	selectedWorkii!: IWorkii;
	index!: number;
	modalSwitch: boolean = false;

	ngOnInit(): void {
		this.modalService.$modal.subscribe((valor) => {
			this.modalSwitch = valor;
		});

		this.toggleLayout$ = this.toggleLayoutService.toggleLayout$;
	}

	openModal(workii: IWorkii, index: number, applies: readonly IApplicationUser[]): void {
		this.modalSwitch = true;
		this.selectedWorkii = workii;
		this.index = index;

		applies.map((apply) => {
			workii.id.includes(apply.workii.id) ? (this.applicationId = apply.id!) : '';
		});
	}

	ngDestroy(): void {
		this.modalService.$modal.unsubscribe();
	}
}
