import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { IAppState } from 'src/app/core/state/app.state';
import { UserService } from '../../auth/services/user.service';
import { IApplicationUser } from '../workiis/interfaces/workii.interface';
import { WorkiiActions } from '../workiis/state/actions/workii.actions';
import { selectCurrentWorkii, selectListApplications } from '../workiis/state/selectors/workii.selectors';

@Component({
	selector: 'workii-detail',
	templateUrl: './workii-detail.component.html',
	styleUrls: ['./workii-detail.component.scss']
})
export class WorkiiDetailComponent implements OnInit {
	userCurrentId!: string;
	isOwner!: boolean;
	applies!: IApplicationUser[];
	applications$!: Observable<readonly IApplicationUser[]>;
	workii$!: Observable<IWorkii | null>;
	index$!: Observable<number>;
	combined$!: Observable<{ index: number; applications: readonly IApplicationUser[]; workii: IWorkii | null }>;

	constructor(private route: ActivatedRoute, private userService: UserService, private store: Store<IAppState>) {}

	ngOnInit(): void {
		this.userCurrentId = this.userService.getCurrentUser();
		const slug = this.route.snapshot.paramMap.get('slug')!;

		this.store.dispatch(WorkiiActions.loadWorkii({ slug }));

		this.workii$ = this.store.select(selectCurrentWorkii);

		this.store.dispatch(WorkiiActions.loadApplications());
		this.applications$ = this.store.select(selectListApplications);

		this.combined$ = combineLatest([this.applications$, this.workii$]).pipe(
			map(([applications, workii]) => {
				if (!applications || !workii) {
					return { index: -1, applications: [], workii: null };
				}
				const index = applications.findIndex((application) => application.workii.id === workii.id);
				return { index, applications, workii };
			})
		);
	}
}
