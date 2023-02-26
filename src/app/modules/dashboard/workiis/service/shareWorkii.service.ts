import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IWorkii } from '../interfaces/workii.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedWorkiiService {
  private workii: IWorkii | undefined;

  constructor() { }

  setWorkii(workii: IWorkii) {
    this.workii = workii;
    console.log(workii.name);

  }

  getWorkii(): IWorkii | undefined {
    console.log(this.workii?.name);

    return this.workii;
  }
}
