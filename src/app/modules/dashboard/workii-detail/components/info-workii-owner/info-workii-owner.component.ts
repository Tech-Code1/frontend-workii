import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { WorkiiActions } from '../../../workiis/state/actions/workii.actions';

@Component({
  selector: 'info-workii-owner',
  templateUrl: './info-workii-owner.component.html',
  styleUrls: ['./info-workii-owner.component.scss']
})
export class InfoWorkiiOwnerComponent {

  @Input()
  workii!: IWorkii;

  @Input()
  userCurrentId!: string;

  constructor(private store: Store) {}

  ngOnInit(): void {
  }

  shareWorkii(event: Event) {
    event.stopPropagation()
  }

  async applyWorkii() {
    this.store.dispatch(WorkiiActions.applyWorkiiRequest(this.userCurrentId,this.workii.id!))
  }
}
