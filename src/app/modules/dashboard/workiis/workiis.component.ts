import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren, inject } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { SwitchService } from '../../auth/services/switch.service';
import { UserService } from '../../auth/services/user.service';
import { IApplicationUser } from './interfaces/workii.interface';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/core/state/app.state';
import { selectListApplications, selectListWorkiis } from './state/selectors/workii.selectors';
import { WorkiiActions } from './state/actions/workii.actions';
import { TargetService } from './service/targetService.service';
import { TimeService } from './service/timeService.service';

export interface WorkiiInfo {
  isApplied: boolean;
  isCreatedByCurrentUser: boolean;
}

@Component({
  selector: 'app-workiis',
  templateUrl: './workiis.component.html',
  styleUrls: ['./workiis.component.scss'],
})
export class WorkiisComponent implements OnInit {

  private store = inject(Store<IAppState>)
  private modalService = inject(SwitchService)
  private userService = inject(UserService)
  public targetService = inject(TargetService)
  public timeService = inject(TimeService)

  @ViewChildren('checkedTarget') checkedInputsTarget!: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChildren('checkedTime') checkedInputsTime!: QueryList<ElementRef<HTMLInputElement>>;

  combined$!: Observable<{ applications: readonly IApplicationUser[]; workiis: readonly IWorkii[] }>;
  workiisInApplications$!: Observable<WorkiiInfo[]>;
  userCurrentId!: string;
  isApplyWorkiiId!: string[];
  modalSwitch: boolean = false;
  isFilterOpened: boolean = true;
  workiis$: Observable<readonly IWorkii[]> = new Observable<readonly IWorkii[]>();
  applications$: Observable<readonly IApplicationUser[]> = new Observable<readonly IApplicationUser[]>();
  newSelectedTargets: string[] = [];
  targets: string[] = [
    'Arte',
    'Informatica',
    'Humanidades',
    'Ciencias',
    'Ingenieria',
    'Entretenimiento',
    'Comunicaciones',
    'Marketing',
    'Otro'];
  times: string[] = ['3', '5', '7', '10', '15'];

  ngOnInit(): void {
    this.userCurrentId = this.userService.getCurrentUser()

    this.modalService.$modal.subscribe((valor) => {
      this.modalSwitch = valor
    })

    this.store.dispatch(WorkiiActions.loadWorkiis())
    this.store.dispatch(WorkiiActions.loadApplications())

    this.workiis$ = this.store.select(selectListWorkiis)
    this.applications$ = this.store.select(selectListApplications)

    this.workiisInApplications$ = this.workiisInApplications()

    this.combined$ = combineLatest([this.applications$, this.workiis$]).pipe(
      map(([applications, workiis]) => {
        if (!applications || !workiis) {
          return { applications: [], workiis: [] };
        }
        return { applications, workiis };
      })
    );
  }

  workiisInApplications(): Observable<(IWorkii & WorkiiInfo)[]> {
    return combineLatest([this.workiis$, this.applications$]).pipe(
      map(([workiis, applications]) => {
        const applyWorkiiIds = applications.map(apply => apply.workii.id);
        return workiis.map(workii => ({
          ...workii,
          isApplied: applyWorkiiIds.includes(workii.id),
          isCreatedByCurrentUser: this.userCurrentId === workii.user.id
        }));
      })
    );
  }

  openModal(): void {
    this.modalSwitch = true
  }

  closeModal() {
    this.modalService.$modal.emit(false)
  }

  toggleFilter():void {
    this.isFilterOpened = !this.isFilterOpened
  }

  onTargetChange(target: string, checked: boolean): void {

    if (checked) {
      const updatedSelectedTargets = [...this.targetService.getSelectedTargets$().value, target];
      this.targetService.updateSelectedTargets(updatedSelectedTargets);
    } else {
      const updatedSelectedTargets = this.targetService.getSelectedTargets$().value.filter(t => t !== target);
      this.targetService.updateSelectedTargets(updatedSelectedTargets);
    }
  }

  onTimeChange(time: string, checked: boolean): void {

    if (checked) {
      const updatedSelectedTargets = [...this.timeService.getSelectedTimes$().value, time];
      this.timeService.updateSelectedTime(updatedSelectedTargets);
    } else {
      const updatedSelectedTargets = this.timeService.getSelectedTimes$().value.filter(t => t !== time);

      this.timeService.updateSelectedTime(updatedSelectedTargets);
    }
  }
}
