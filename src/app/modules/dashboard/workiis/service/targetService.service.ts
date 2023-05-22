import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TargetService {
	private selectedTargets$ = new BehaviorSubject<string[]>([]);

	getSelectedTargets$(): BehaviorSubject<string[]> {
		return this.selectedTargets$;
	}

	getSelectedTargetsLength(): number {
		const selectedTargets = this.selectedTargets$.value;
		return selectedTargets ? selectedTargets.length : 0;
	}

	updateSelectedTargets(targets: string[]): void {
		this.selectedTargets$.next(targets);
	}

	clearSelectedTargets(): void {
		this.selectedTargets$.next([]);
	}
}
