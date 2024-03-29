import { Component, ElementRef, QueryList, ViewChildren, inject } from '@angular/core';
import { StatusService } from '../../service/statusService.service';

@Component({
	selector: 'filter-status',
	templateUrl: './filter-status.component.html',
	styleUrls: ['./filter-status.component.scss']
})
export class FilterStatusComponent {
	public statusService = inject(StatusService);

	@ViewChildren('checkedOwnership') checkedInputsStatus!: QueryList<ElementRef<HTMLInputElement>>;

	status: string[] = ['Publicados', 'Aplicados', 'Disponibles'];

	deleteStatus(): void {
		this.checkedInputsStatus.forEach((checkedInput: ElementRef) => {
			checkedInput.nativeElement.checked = false;
		});
		this.statusService.updateSelectedStatus([]);
	}

	onStatusChange(state: string, checked: boolean): void {
		if (checked) {
			const updatedSelectedStatus = [...this.statusService.getSelectedStatus$().value, state];
			this.statusService.updateSelectedStatus(updatedSelectedStatus);
		} else {
			const updatedSelectedStatus = this.statusService.getSelectedStatus$().value.filter((t) => t !== state);
			this.statusService.updateSelectedStatus(updatedSelectedStatus);
		}
	}
}
