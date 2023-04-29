import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren, inject } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, EMPTY, filter, fromEvent, map, Observable, of, Subject, switchMap, takeUntil, throttleTime, tap, asyncScheduler, shareReplay } from 'rxjs';
import { SwitchService } from '../../auth/services/switch.service';
import { UserService } from '../../auth/services/user.service';
import { IApplicationUser } from './interfaces/workii.interface';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/core/state/app.state';
import { selectListApplications, selectListWorkiis, selectSearchWorkiis } from './state/selectors/workii.selectors';
import { WorkiiActions } from './state/actions/workii.actions';
import { TargetService } from './service/targetService.service';
import { TimeService } from './service/timeService.service';
import { CostService } from './service/costService.service';
import { StatusService } from './service/statusService.service';
import { selectLoadingUi } from '../../../shared/state/selectors/user.selectors';
import { FormControl } from '@angular/forms';
import { UiActions } from '../../../shared/state/actions/ui.actions';

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

  searchControl = new FormControl<string>('');
  searchWorkiis: readonly IWorkii[] = [];
  //loading$: Observable<boolean> = new Observable<boolean>();
  //combined$!: Observable<{ applications: readonly IApplicationUser[]; workiis: readonly IWorkii[] }>;
  //combinedSearch$!: Observable<{ applications: readonly IApplicationUser[]; searchWorkiis: readonly IWorkii[] }>;
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
    this.userCurrentId = this.userService.getCurrentUser()

    this.modalService.$modal.subscribe((valor) => {
      this.modalSwitch = valor
    })

    this.store.dispatch(WorkiiActions.loadWorkiis())
    this.store.dispatch(WorkiiActions.loadApplications())

    this.workiis$ = this.store.select(selectListWorkiis)
    this.applications$ = this.store.select(selectListApplications)
    this.workiisInApplications$ = this.workiisInApplications()

    this.searchControl.valueChanges
      .pipe(
        debounceTime(1000),
        filter((searchTerm: string | null) => searchTerm !== null && (searchTerm.length >= 3 || searchTerm.length === 0)),
        distinctUntilChanged(),
      )
      .subscribe((searchTerm: string | null) => {
        if (searchTerm !== null) {
          console.log(searchTerm);

          this.store.dispatch(WorkiiActions.searchWorkii(searchTerm, { limit: 10, offset: 0 }));
        }
      });

    this.searchWorkiis$ = this.store.select(selectSearchWorkiis);
  }

  workiisInApplications(): Observable<(IWorkii & WorkiiInfo)[]> {
    return combineLatest([this.workiis$, this.applications$]).pipe(
      map(([workiis, applications]) => {
        if (!workiis || workiis.length === 0) {
          return [];
        }


        const applyWorkiiIds = applications.map((apply) => apply.workii.id);

        console.log(applyWorkiiIds, 'applyWorkiiIds');

        return workiis.map(workii => ({
          ...workii,
          isApplied: applyWorkiiIds.includes(workii.id),
          isCreatedByCurrentUser: workii.user && this.userCurrentId === workii.user.id,
        }));
      })
    );
  }

  searchInApplications(): Observable<(IWorkii & WorkiiInfo)[]> {
    return combineLatest([this.searchWorkiis$, this.applications$]).pipe(
      map(([searchWorkiis, applications]) => {

        if (!searchWorkiis || searchWorkiis.length === 0) {

          return [];
        }

        console.log(this.applications$, 'applications$');
        console.log(applications, 'applications');

        const applyWorkiiIds = applications.map((apply) => apply.workii.id);

        console.log(applyWorkiiIds, 'applyWorkiiIds');


        const data = searchWorkiis.map(searchWorkii => ({
          ...searchWorkii,
          isApplied: applyWorkiiIds.includes(searchWorkii.id),
          isCreatedByCurrentUser: searchWorkii.user && this.userCurrentId === searchWorkii.user.id,
        }));

        return data;
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
