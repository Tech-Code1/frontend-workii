import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
	Observable,
	Subject,
	combineLatest,
	debounceTime,
	delay,
	distinctUntilChanged,
	map,
	takeUntil,
	tap
} from 'rxjs';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { IAppState } from 'src/app/core/state/app.state';
import { UiActions } from 'src/app/shared/state/actions/ui.actions';
import { selectLoadingUi } from 'src/app/shared/state/selectors/user.selectors';
import { SwitchService, UserService } from '../../auth/services';
import { IApplicationUser } from './interfaces/workii.interface';
import { CostService, StatusService, TargetService, TimeService } from './service';
import { WorkiiActions } from './state/actions/workii.actions';
import {
	selectListApplications,
	selectListWorkiis,
	selectNotFound,
	selectSearchTerm,
	selectSearchWorkiis,
	selectTotalResults,
	selectTotalSearchResults
} from './state/selectors/workii.selectors';

export interface IWorkiiInfo {
	isApplied: boolean;
	isCreatedByCurrentUser: boolean;
}

@Component({
	selector: 'app-workiis',
	templateUrl: './workiis.component.html',
	styleUrls: ['./workiis.component.scss']
})
export class WorkiisComponent implements OnInit, OnDestroy {
	private store = inject(Store<IAppState>);
	private modalService = inject(SwitchService);
	private userService = inject(UserService);
	public targetService = inject(TargetService);
	public timeService = inject(TimeService);
	public costService = inject(CostService);
	public statusService = inject(StatusService);

	totalResultsWorkiis$: Observable<number> = new Observable<number>();
	totalSearchResults$: Observable<number> = new Observable<number>();
	limit: number = 20;
	offset: number = 0;
	public hasSearched: boolean = false;
	private destroy$ = new Subject<void>();
	loading$: Observable<boolean> = new Observable<boolean>();
	isFound$: Observable<boolean> = new Observable<boolean>();
	searchTerm$: Observable<string> = new Observable<string>();
	searchControl: FormControl<string> = new FormControl();
	userCurrentId!: string;
	modalSwitch: boolean = false;
	isFilterOpened: boolean = true;
	workiis$: Observable<readonly IWorkii[]> = new Observable<readonly IWorkii[]>();
	searchWorkiis$: Observable<readonly IWorkii[]> = new Observable<readonly IWorkii[]>();
	applications$: Observable<readonly IApplicationUser[]> = new Observable<readonly IApplicationUser[]>();

	ngOnInit(): void {
		this.userCurrentId = this.userService.getCurrentUser();
		this.isFound$ = this.store.select(selectNotFound);
		this.loading$ = this.store.select(selectLoadingUi);
		this.searchTerm$ = this.store.select(selectSearchTerm);
		this.searchWorkiis$ = this.store.select(selectSearchWorkiis);
		this.totalSearchResults$ = this.store.select(selectTotalSearchResults);

		this.modalService.$modal.subscribe((valor) => {
			this.modalSwitch = valor;
		});

		this.store.dispatch(WorkiiActions.loadWorkiis({ limit: this.limit, offset: this.offset }));
		this.store.dispatch(WorkiiActions.loadApplications());

		this.workiis$ = this.store.select(selectListWorkiis);
		this.applications$ = this.store.select(selectListApplications);
		this.totalResultsWorkiis$ = this.store.select(selectTotalResults);

		this.searchTerm$.pipe(takeUntil(this.destroy$)).subscribe((searchTerm) => {
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
				takeUntil(this.destroy$)
			)
			.subscribe((searchTerm: string) => {
				this.store.dispatch(WorkiiActions.updateSearchTerm({ searchTerm }));
				this.store.dispatch(WorkiiActions.searchWorkii(searchTerm, { limit: this.limit, offset: this.offset }));
			});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	clearInput(): void {
		this.searchControl.setValue('');
	}

	workiisOrSearchInApplications(source$: Observable<readonly IWorkii[]>): Observable<(IWorkii & IWorkiiInfo)[]> {
		return combineLatest([source$, this.applications$]).pipe(
			map(([workiis, applications]) => {
				if (!workiis || workiis.length === 0) {
					return [];
				}
				const applyWorkiiIds = applications.map((apply) => apply.workii.id);

				return workiis.map((workii) => ({
					...workii,
					isApplied: applyWorkiiIds.includes(workii.id),
					isCreatedByCurrentUser: workii.user && this.userCurrentId === workii.user.id
				}));
			})
		);
	}

	openModal(): void {
		this.modalSwitch = true;
	}

	closeModal(): void {
		this.modalService.$modal.emit(false);
	}

	toggleFilter(): void {
		this.isFilterOpened = !this.isFilterOpened;

		if (!this.isFilterOpened) {
			this.targetService.clearSelectedTargets();
			this.timeService.clearSelectedTime();
			this.costService.clearSelectedCost();
			this.statusService.clearSelectedStatus();
		}
	}

	searchWorkii(): void {
		const searchTerm = this.searchControl.value;
		this.store.dispatch(WorkiiActions.updateSearchTerm({ searchTerm }));
		this.store.dispatch(WorkiiActions.searchWorkii(searchTerm, { limit: this.limit, offset: this.offset }));
	}

	onPageChangeSearch(page: number): void {
		this.offset = (page - 1) * this.limit;
		this.searchWorkii();
	}

	onPageChangeWorkiis(page: number): void {
		this.offset = (page - 1) * this.limit;
		this.store.dispatch(WorkiiActions.loadWorkiis({ limit: this.limit, offset: this.offset }));
	}
}
