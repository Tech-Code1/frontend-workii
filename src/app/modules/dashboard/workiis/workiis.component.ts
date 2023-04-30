import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { combineLatest, debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { SwitchService } from '../../auth/services/switch.service';
import { UserService } from '../../auth/services/user.service';
import { IApplicationUser } from './interfaces/workii.interface';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/core/state/app.state';
import { selectListApplications, selectListWorkiis, selectSearchWorkiis, selectNotFound } from './state/selectors/workii.selectors';
import { WorkiiActions } from './state/actions/workii.actions';
import { TargetService } from './service/targetService.service';
import { TimeService } from './service/timeService.service';
import { CostService } from './service/costService.service';
import { StatusService } from './service/statusService.service';
import { FormControl } from '@angular/forms';
import { UiActions } from 'src/app/shared/state/actions/ui.actions';
import { selectLoadingUi } from 'src/app/shared/state/selectors/user.selectors';

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
  public costService = inject(CostService)
  public statusService = inject(StatusService)

  @ViewChildren('checkedTarget') checkedInputsTarget!: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChildren('checkedTime') checkedInputsTime!: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChildren('checkedCost') checkedInputsCost!: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChildren('checkedOwnership') checkedInputsStatus!: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChild('search') search!: ElementRef<HTMLInputElement>;

  loading$: Observable<boolean> = new Observable<boolean>();
  isFound$: Observable<boolean> = new Observable<boolean>();
  searchControl: FormControl<string> = new FormControl;
  searchWorkiis: readonly IWorkii[] = [];
  workiisInApplications$!: Observable<WorkiiInfo[]>;
  userCurrentId!: string;
  isApplyWorkiiId!: string[];
  modalSwitch: boolean = false;
  isFilterOpened: boolean = true;
  workiis$: Observable<readonly IWorkii[]> = new Observable<readonly IWorkii[]>();
  searchWorkiis$: Observable<readonly IWorkii[]> = new Observable<readonly IWorkii[]>();
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
  costs: string[] = ['desc', 'asc'];
  status: string[] = ['Publicados', 'Aplicados', 'Disponibles'];

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoadingUi)
    this.isFound$ = this.store.select(selectNotFound)

    this.userCurrentId = this.userService.getCurrentUser()

    this.modalService.$modal.subscribe((valor) => {
      this.modalSwitch = valor
    })

    this.store.dispatch(WorkiiActions.loadWorkiis({ limit: 20, offset: 0 }))
    this.store.dispatch(WorkiiActions.loadApplications())

    this.workiis$ = this.store.select(selectListWorkiis)
    this.applications$ = this.store.select(selectListApplications)

    this.searchControl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
      )
      .subscribe((searchTerm: string) => {
        this.store.dispatch(WorkiiActions.searchWorkii(searchTerm, { limit: 20, offset: 0 }));
      });

    this.searchWorkiis$ = this.store.select(selectSearchWorkiis);
  }

  workiisOrSearchInApplications(source$: Observable<readonly IWorkii[]>): Observable<(IWorkii & WorkiiInfo)[]> {
    return combineLatest([source$, this.applications$]).pipe(
      map(([workiis, applications]) => {
        if (!workiis || workiis.length === 0) {
          return [];
        }
        const applyWorkiiIds = applications.map((apply) => apply.workii.id);

        return workiis.map(workii => ({
          ...workii,
          isApplied: applyWorkiiIds.includes(workii.id),
          isCreatedByCurrentUser: workii.user && this.userCurrentId === workii.user.id,
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

  toggleFilter(): void {
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
      const updatedSelectedTime = [...this.timeService.getSelectedTimes$().value, time];
      this.timeService.updateSelectedTime(updatedSelectedTime);
    } else {
      const updatedSelectedTime = this.timeService.getSelectedTimes$().value.filter(t => t !== time);

      this.timeService.updateSelectedTime(updatedSelectedTime);
    }
  }

  onCostChange(cost: string, checked: boolean): void {

    if (checked) {
      this.costService.updateSelectedCost(cost);
    } else {
      this.costService.clearSelectedCost();
    }
  }

  onStatusChange(state: string, checked: boolean): void {
    if (checked) {
      const updatedSelectedStatus = [...this.statusService.getSelectedStatus$().value, state];
      this.statusService.updateSelectedStatus(updatedSelectedStatus);
    } else {
      const updatedSelectedStatus = this.statusService.getSelectedStatus$().value.filter(t => t !== state);
      this.statusService.updateSelectedStatus(updatedSelectedStatus);
    }
  }
}
