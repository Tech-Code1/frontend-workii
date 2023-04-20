import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CostService {
  private selectedCost$ = new BehaviorSubject<string>('');

  getSelectedCost$() {
    return this.selectedCost$;
  }

  updateSelectedCost(cost: string) {
    this.selectedCost$.next(cost);
  }

  clearSelectedCost() {
    this.selectedCost$.next('');
  }
}
