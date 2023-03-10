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
  userCurrentId: string = this.userService.getCurrentUser();

  @Input()
  isApplyWorkiiId!: string[];

  applies!: IApplicationUser[];
  modalSwitch: boolean = false;
  selectedWorkii: any;
  index!: number;
  apply!: string;

  constructor(private modalService: SwitchService,
    private workiisService: WorkiisService,
    private userService: UserService,
    private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading)

    this.store.dispatch(WorkiiActions.loadWorkiis())

    this.modalService.$modal.subscribe((valor) => {
      this.modalSwitch = valor
    })

    this.findAllApplicationsWorkiiByUser(this.userCurrentId)
    .pipe(
      map(applies => {
        //const applyId = applies.map(apply => apply.id);
        const userApplies = applies.map(apply => apply.workii.id)

        return {userApplies, applies}
      })
    ).subscribe(({userApplies, applies}) => {

      this.isApplyWorkiiId = userApplies
      this.applies = applies
    })

  }

  openModal(workii: IWorkii, index: number, applies: IApplicationUser[]): void {
    this.modalSwitch = true
    this.selectedWorkii = workii;
    this.index = index;

    applies.forEach(apply => {
      if (apply.workii.id.match(workii?.id!)) {
        this.apply = apply.id
      }
    })
  }

  findAllApplicationsWorkiiByUser(id: string): Observable<IApplicationUser[]> {

    return this.workiisService.findAllApplicationsWorkiiByUser(id)
  }
}

