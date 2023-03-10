import { Component, Input } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';
import { IApplicationUser } from '../../interfaces/workii.interface';
import { SharedWorkiiService } from '../../service/shareWorkii.service';
import { WorkiisService } from '../../service/workiis.service';
import { UserService } from '../../../../auth/services/user.service';
import { Store } from '@ngrx/store';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { WorkiiActions } from '../../state/actions/workii.actions';
import { selectLoading } from '../../state/selectors/workii.selectors';
import { IAppState } from '../../../../../core/state/app.state';

@Component({
  selector: 'workiis-cards',
  templateUrl: './workiis-cards.component.html',
  styleUrls: ['./workiis-cards.component.scss']
})
export class WorkiisCardsComponent {

  loading$: Observable<boolean> = new Observable<boolean>();
  workiis$: Observable<readonly IWorkii[]> = this.store.select(state => state.workiis.workiis)
  applications$: Observable<readonly IApplicationUser[]> = this.store.select(state => state.workiis.applications)
  userCurrentId: string = this.userService.getCurrentUser();

  modalSwitch: boolean = false;
  selectedWorkii: any;
  index!: number;

  constructor(private modalService: SwitchService,
    private workiisService: WorkiisService,
    private userService: UserService,
    private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading)

    this.store.dispatch(WorkiiActions.loadWorkiis())

    this.store.dispatch(WorkiiActions.loadApplications())

    this.modalService.$modal.subscribe((valor) => {
      this.modalSwitch = valor
  })

    this.store.dispatch(WorkiiActions.loadApplications())
  }

  openModal(workii: IWorkii, index: number): void {
    this.modalSwitch = true
    this.selectedWorkii = workii;
    this.index = index;
  }

  ngDestroy() {
    this.modalService.$modal.unsubscribe();
  }
}

