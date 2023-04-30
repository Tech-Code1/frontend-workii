import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private selectedTime$ = new BehaviorSubject<string[]>([]);

  getSelectedTimes$(): BehaviorSubject<string[]> {
    return this.selectedTime$;
  }

  getSelectedTimeLength(): number {
    const selectedTime = this.selectedTime$.value;
    return selectedTime ? selectedTime.length : 0;
  }

  updateSelectedTime(time: string[]) {
    this.selectedTime$.next(time);
  }

  clearSelectedTime() {
    this.selectedTime$.next([]);
  }
}
