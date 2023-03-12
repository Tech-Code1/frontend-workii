import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';
import { IApplicationUser } from '../../interfaces/workii.interface';

import { UserService } from '../../../../auth/services/user.service';
import { Store } from '@ngrx/store';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { WorkiiActions } from '../../state/actions/workii.actions';
import { selectListApplications, selectLoading, selectWorkiis } from '../../state/selectors/workii.selectors';
import { IAppState } from '../../../../../core/state/app.state';

@Component({
  selector: 'workiis-cards',
  templateUrl: './workiis-cards.component.html',
  styleUrls: ['./workiis-cards.component.scss']
})
export class WorkiisCardsComponent {

  loading$: Observable<boolean> = new Observable<boolean>();
  workiis$: Observable<readonly IWorkii[]> = this.store.select(state => state.workiis.workiis)
  applications$: Observable<readonly IApplicationUser[]> = new Observable<readonly IApplicationUser[]>();
  workiiIds$!: Observable<string[]>;
  userCurrentId: string = this.userService.getCurrentUser();
  isOwner!: Observable<readonly boolean[]>
  applicationId!: string;
  isApply!: boolean;
  apllyUserId!: string;

  modalSwitch: boolean = false;
  selectedWorkii!: IWorkii;
  index!: number;

  constructor(private modalService: SwitchService,
    private userService: UserService,
    private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading)
    this.store.dispatch(WorkiiActions.loadWorkiis())

    this.store.dispatch(WorkiiActions.loadApplications())

    this.applications$ = this.store.select(selectListApplications)

    this.workiiIds$ = this.applications$.pipe(
      map(workiis => workiis.map(worki => worki.id))
    )

    this.modalService.$modal.subscribe((valor) => {
      this.modalSwitch = valor
  })


  }

  workiisInApplications(): Observable<readonly boolean[]> {
    return combineLatest([this.workiis$, this.applications$]).pipe(
      map(([workiis, applications]) => {
        const applyWorkiiIds = applications.map(apply => apply.workii.id);
        return workiis.map(workii => applyWorkiiIds.includes(workii.id));
      })
    );
  }

  openModal(workii: IWorkii, index: number, applies: readonly IApplicationUser[]): void {
    this.modalSwitch = true
    this.selectedWorkii = workii;
    this.index = index;

    applies.map(apply => {
      workii.id.includes(apply.workii.id)
      ?  this.applicationId = apply.id
      : ''
    })
  }

  ngDestroy() {
    this.modalService.$modal.unsubscribe();
  }
}


