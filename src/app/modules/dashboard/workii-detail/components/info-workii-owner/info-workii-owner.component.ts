import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { IAppState } from 'src/app/core/state/app.state';
import { IUsersApplicationResponse } from '../../../workiis/interfaces/workii.interface';
import { WorkiiActions } from '../../../workiis/state/actions/workii.actions';
import { selectUsersApplyToWorkii } from '../../../workiis/state/selectors/workii.selectors';

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

  applyUsersToWorkii!: Observable<IUsersApplicationResponse[]>

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {

    console.log(this.workii.id);

    //this.store.select(selectUsersApplyToWorkii)
    this.store.dispatch(WorkiiActions.loadUsersApply(this.workii.id, {limit: 10, offset: 0}))
  }

  shareWorkii(event: Event) {
    event.stopPropagation()
  }

  async applyWorkii() {
    this.store.dispatch(WorkiiActions.applyWorkiiRequest(this.userCurrentId,this.workii.id!))
  }
}
