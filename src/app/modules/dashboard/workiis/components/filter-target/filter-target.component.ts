import { Component, ElementRef, QueryList, ViewChildren, inject } from '@angular/core';
import { TargetService } from '../../service/targetService.service';

@Component({
	selector: 'filter-target',
	templateUrl: './filter-target.component.html',
	styleUrls: ['./filter-target.component.scss']
})
export class FilterTargetComponent {
	public targetService = inject(TargetService);

	@ViewChildren('checkedTarget') checkedInputsTarget!: QueryList<ElementRef<HTMLInputElement>>;
	targets: string[] = [
		'Arte',
		'Informatica',
		'Humanidades',
		'Ciencias',
		'Ingenieria',
		'Entretenimiento',
		'Comunicaciones',
		'Marketing',
		'Otro'
	];

	deleteTarget() {
		this.checkedInputsTarget.forEach((checkedInput: ElementRef) => {
			checkedInput.nativeElement.checked = false;
		});
		this.targetService.updateSelectedTargets([]);
	}

	onTargetChange(target: string, checked: boolean): void {
		if (checked) {
			const updatedSelectedTargets = [...this.targetService.getSelectedTargets$().value, target];
			this.targetService.updateSelectedTargets(updatedSelectedTargets);
		} else {
			const updatedSelectedTargets = this.targetService.getSelectedTargets$().value.filter((t) => t !== target);
			this.targetService.updateSelectedTargets(updatedSelectedTargets);
		}
	}
}
