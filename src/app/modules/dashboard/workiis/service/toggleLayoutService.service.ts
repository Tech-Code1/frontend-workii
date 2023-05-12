import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleLayoutService {
  private _toggleLayout = new BehaviorSubject<boolean>(false);
  toggleLayout$ = this._toggleLayout.asObservable();

  toggleLayout() {
    this._toggleLayout.next(!this._toggleLayout.value);
  }
}
