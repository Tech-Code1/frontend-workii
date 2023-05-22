import { Component, inject, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CostService } from '../../service/costService.service';

@Component({
	selector: 'filter-cost',
	templateUrl: './filter-cost.component.html',
	styleUrls: ['./filter-cost.component.scss']
})
export class FilterCostComponent {
	public costService = inject(CostService);

	@ViewChildren('checkedCost') checkedInputsCost!: QueryList<ElementRef<HTMLInputElement>>;

	costs: string[] = ['desc', 'asc'];

	deleteCost() {
		this.checkedInputsCost.forEach((checkedInput: ElementRef) => {
			checkedInput.nativeElement.checked = false;
		});
		this.costService.updateSelectedCost('');
	}

	onCostChange(cost: string, checked: boolean): void {
		if (checked) {
			this.costService.updateSelectedCost(cost);
		} else {
			this.costService.clearSelectedCost();
		}
	}
}
