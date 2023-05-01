import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { combineLatest, debounceTime, delay, distinctUntilChanged, filter, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { SwitchService } from '../../auth/services/switch.service';
import { UserService } from '../../auth/services/user.service';
import { IApplicationUser } from './interfaces/workii.interface';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/core/state/app.state';
import { selectListApplications, selectListWorkiis, selectSearchWorkiis, selectNotFound, selectSearchTerm } from './state/selectors/workii.selectors';
import { WorkiiActions } from './state/actions/workii.actions';
import { TargetService } from './service/targetService.service';
import { TimeService } from './service/timeService.service';
import { CostService } from './service/costService.service';
import { StatusService } from './service/statusService.service';
import { FormControl } from '@angular/forms';
import { UiActions } from 'src/app/shared/state/actions/ui.actions';
import { selectLoadingUi } from 'src/app/shared/state/selectors/user.selectors';
import { AnimationOptions } from 'ngx-lottie';

export interface WorkiiInfo {
  isApplied: boolean;
  isCreatedByCurrentUser: boolean;
}

@Component({
  selector: 'app-workiis',
  templateUrl: './workiis.component.html',
  styleUrls: ['./workiis.component.scss'],
})
export class WorkiisComponent implements OnInit, OnDestroy {

  private store = inject(Store<IAppState>)
  private modalService = inject(SwitchService)
  private userService = inject(UserService)
  public targetService = inject(TargetService)
  public timeService = inject(TimeService)
  public costService = inject(CostService)
  public statusService = inject(StatusService)

  @ViewChildren('checkedTime') checkedInputsTime!: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChildren('checkedCost') checkedInputsCost!: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChildren('checkedOwnership') checkedInputsStatus!: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChild('search') search!: ElementRef<HTMLInputElement>;

  public hasSearched: boolean = false;
  private destroy$ = new Subject<void>();
  loading$: Observable<boolean> = new Observable<boolean>();
  isFound$: Observable<boolean> = new Observable<boolean>();
  searchTerm$: Observable<string> = new Observable<string>();
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
  times: string[] = ['3', '5', '7', '10', '15'];
  costs: string[] = ['desc', 'asc'];
  status: string[] = ['Publicados', 'Aplicados', 'Disponibles'];

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoadingUi)
    this.isFound$ = this.store.select(selectNotFound)
    this.searchTerm$ = this.store.select(selectSearchTerm);

    this.userCurrentId = this.userService.getCurrentUser()

    this.modalService.$modal.subscribe((valor) => {
      this.modalSwitch = valor
    })

    this.store.dispatch(WorkiiActions.loadWorkiis({ limit: 20, offset: 0 }))
    this.store.dispatch(WorkiiActions.loadApplications())

    this.workiis$ = this.store.select(selectListWorkiis)
    this.applications$ = this.store.select(selectListApplications)
    this.searchWorkiis$ = this.store.select(selectSearchWorkiis);

    this.searchTerm$.pipe(
      takeUntil(this.destroy$)
    )
      .subscribe(searchTerm => {
        this.searchControl.setValue(searchTerm, { emitEvent: false });
      });

    this.searchControl.valueChanges
      .pipe(
        tap(() => {
          this.hasSearched = true;
          this.store.dispatch(UiActions.isLoading());
        }),
        debounceTime(500),
        distinctUntilChanged(),
        delay(500),
        takeUntil(this.destroy$),
      )
      .subscribe((searchTerm: string) => {
        this.store.dispatch(WorkiiActions.updateSearchTerm({ searchTerm }));
        this.store.dispatch(WorkiiActions.searchWorkii(searchTerm, { limit: 20, offset: 0 }));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  lottieOptions: AnimationOptions = {
    path: 'https://assets4.lottiefiles.com/packages/lf20_LKXG6QRgtE.json',
  };

  clearInput() {
    this.searchControl.setValue('');
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
