import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SwitchService } from '../../services/switch.service';

@Component({
	selector: 'modal-tutorial-workiis',
	templateUrl: './modal-tutorial-workiis.component.html',
	styleUrls: ['./modal-tutorial-workiis.component.scss']
})
export class ModalTutorialWorkiisComponent {
	private modalService = inject(SwitchService);

	initialValue: string = '';
	inputChanged = false;
	step = 1;
	right: boolean = false;
	left: boolean = false;
	changeEmail!: FormGroup;

	closeModal(): void {
		this.modalService.$modal.emit(false);
	}

	stopPropagation(event: Event): void {
		event.stopPropagation();
	}

	plusStep(): void {
		if (this.step < 4) this.step++;
		console.log(this.step);
		this.right = true;
	}

	minusStep(): void {
		if (this.step > 1) this.step--;
		console.log(this.step);
		this.left = true;
	}

	currencyStep(step: number): void {
		this.step = step;
	}
}
