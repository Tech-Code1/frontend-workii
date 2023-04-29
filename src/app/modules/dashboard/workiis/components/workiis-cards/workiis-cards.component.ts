import { Component, Input, inject } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';
import { IApplicationUser } from '../../interfaces/workii.interface';

import { UserService } from '../../../../auth/services/user.service';
import { Store } from '@ngrx/store';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { WorkiiActions } from '../../state/actions/workii.actions';
import { selectListApplications, selectListWorkiis } from '../../state/selectors/workii.selectors';
import { IAppState } from '../../../../../core/state/app.state';
import { selectLoadingUi } from 'src/app/shared/state/selectors/user.selectors';
import { UiActions } from 'src/app/shared/state/actions/ui.actions';
import { WorkiiInfo } from '../../workiis.component';

@Component({
  selector: 'workiis-cards',
  templateUrl: './workiis-cards.component.html',
  styleUrls: ['./workiis-cards.component.scss']
})
export class WorkiisCardsComponent {

  private userService = inject(UserService)
  private store = inject(Store<IAppState>)
  private modalService = inject(SwitchService)

  @Input()
  workiis!: (IWorkii & WorkiiInfo)[] | undefined;

  @Input()
  searchWorkiis!: (IWorkii & WorkiiInfo)[] | undefined;

  @Input()
  applications!: readonly IApplicationUser[] | null;

  @Input()
  isFilterOpened!: boolean;

  @Input()
  userCurrentId!: string;


  loading$: Observable<boolean> = new Observable<boolean>();
  applicationId!: string;
  modalSwitch: boolean = false;
  selectedWorkii!: IWorkii;
  index!: number;

  ngOnInit(): void {
    this.store.dispatch(UiActions.isLoading())
    this.loading$ = this.store.select(selectLoadingUi)

    this.modalService.$modal.subscribe((valor) => {
      this.modalSwitch = valor
    })

    console.log(this.searchWorkiis, 'searchWorkiis');
    console.log(this.applications, 'applications');

  }

  openModal(workii: IWorkii, index: number, applies: readonly IApplicationUser[]): void {
    this.modalSwitch = true
    this.selectedWorkii = workii;
    this.index = index;

    applies.map(apply => {
      workii.id.includes(apply.workii.id)
        ? this.applicationId = apply.id!
        : ''
    })
  }

  ngDestroy() {
    this.modalService.$modal.unsubscribe();
  }
}


