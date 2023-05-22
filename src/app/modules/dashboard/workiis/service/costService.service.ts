import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CostService {
	private selectedCost$ = new BehaviorSubject<string>('');

	getSelectedCost$(): BehaviorSubject<string> {
		return this.selectedCost$;
	}

	updateSelectedCost(cost: string): void {
		this.selectedCost$.next(cost);
	}

	clearSelectedCost(): void {
		this.selectedCost$.next('');
	}
}
