import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { IAppState } from 'src/app/core/state/app.state';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';
import { IApplicationUser, IWorkiiCreate } from '../../interfaces/workii.interface';
import { SharedWorkiiService } from '../../service/shareWorkii.service';
import { WorkiiActions } from '../../state/actions/workii.actions';
import { selectListApplications, selectListWorkiis } from '../../state/selectors/workii.selectors';

@Component({
	selector: 'modal-info-workii',
	templateUrl: './modal-info-workii.component.html',
	styleUrls: ['./modal-info-workii.component.scss']
})
export class ModalInfoWorkiiComponent implements OnInit {
	@Input()
	workii!: IWorkii;

	applications$!: Observable<readonly IApplicationUser[]>;
	workiis$!: Observable<readonly IWorkii[]>;

	@Input()
	applicationId!: string;

	@Input()
	index!: number;

	@Input()
	userCurrentId!: string;

	constructor(
		private modalService: SwitchService,
		private router: Router,
		private sharedWorkiiService: SharedWorkiiService,
		private store: Store<IAppState>
	) {}

	ngOnInit(): void {
		console.log(this.workii, 'workii child');
		console.log(this.applicationId, 'applicationId child');
		console.log(this.index, 'index child');

		this.applications$ = this.store.select(selectListApplications);

		this.workiis$ = this.store.select(selectListWorkiis);
	}

	workiisInApplications(): Observable<readonly boolean[]> {
		return combineLatest([this.workiis$, this.applications$]).pipe(
			map(([workiis, applications]) => {
				const applyWorkiiIds = applications.map((apply) => apply.workii.id);
				return workiis.map((workii) => applyWorkiiIds.includes(workii.id));
			})
		);
	}

	closeModal(): void {
		this.modalService.$modal.emit(false);
	}

	stopPropagation(event: Event): void {
		event.stopPropagation();
	}

	shareWorkii(): void {
		const workii: IWorkiiCreate = {
			name: this.workii.name,
			cost: this.workii.cost,
			description: this.workii.description,
			target: this.workii.target,
			toDoList: this.workii.toDoList,
			userId: this.workii.user.id,
			applications: this.workii.applications,
			slug: this.workii.slug,
			executionTime: this.workii.executionTime,
			status: this.workii.status
		};

		this.sharedWorkiiService.setWorkii(workii);
	}

	detailsWorkiiNavigate(): void {
		const ruta = `/dashboard/workiis/${this.workii?.slug}`;
		this.router.navigate([ruta]);
	}

	async applyWorkii(): Promise<void> {
		this.store.dispatch(WorkiiActions.applyWorkiiRequest(this.userCurrentId, this.workii.id!));
	}

	async removeApplication(workii: string): Promise<void> {
		this.store.dispatch(WorkiiActions.deleteApplicationRequest(this.applicationId, workii));
	}

	deleteWorkii(id: string): void {
		this.store.dispatch(WorkiiActions.deleteWorkiiRequest(id));
	}
}
