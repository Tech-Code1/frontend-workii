import { Component, ElementRef, QueryList, ViewChildren, inject } from '@angular/core';
import { TimeService } from '../../service/timeService.service';

@Component({
	selector: 'filter-time',
	templateUrl: './filter-time.component.html',
	styleUrls: ['./filter-time.component.scss']
})
export class FilterTimeComponent {
	public timeService = inject(TimeService);

	@ViewChildren('checkedTime') checkedInputsTime!: QueryList<ElementRef<HTMLInputElement>>;

	times: string[] = ['3', '5', '7', '10', '15'];

	deleteTime(): void {
		this.checkedInputsTime.forEach((checkedInput: ElementRef) => {
			checkedInput.nativeElement.checked = false;
		});

		this.timeService.updateSelectedTime([]);
	}

	onTimeChange(time: string, checked: boolean): void {
		if (checked) {
			const updatedSelectedTime = [...this.timeService.getSelectedTimes$().value, time];
			this.timeService.updateSelectedTime(updatedSelectedTime);
		} else {
			const updatedSelectedTime = this.timeService.getSelectedTimes$().value.filter((t) => t !== time);

			this.timeService.updateSelectedTime(updatedSelectedTime);
		}
	}
}
