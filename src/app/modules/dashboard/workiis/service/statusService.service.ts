import { Injectable, ElementRef, QueryList } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private selectedStatus$ = new BehaviorSubject<string[]>([]);

  getSelectedStatus$() {
    return this.selectedStatus$;
  }

  getSelectedStatusLength(): number {
    const selectedStatus = this.selectedStatus$.value;
    return selectedStatus ? selectedStatus.length : 0;
  }

  updateSelectedStatus(status: string[]) {
    this.selectedStatus$.next(status);
  }

  clearSelectedStatus() {
    this.selectedStatus$.next([]);
  }
}
