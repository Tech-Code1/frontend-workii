import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class StatusService {
	private selectedStatus$ = new BehaviorSubject<string[]>([]);

	getSelectedStatus$(): BehaviorSubject<string[]> {
		return this.selectedStatus$;
	}

	getSelectedStatusLength(): number {
		const selectedStatus = this.selectedStatus$.value;
		return selectedStatus ? selectedStatus.length : 0;
	}

	updateSelectedStatus(status: string[]): void {
		this.selectedStatus$.next(status);
	}

	clearSelectedStatus(): void {
		this.selectedStatus$.next([]);
	}
}
