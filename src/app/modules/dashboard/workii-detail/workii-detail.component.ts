import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedWorkiiService } from '../workiis/service/shareWorkii.service';
import { IApplicationUser } from '../workiis/interfaces/workii.interface';
import { WorkiisService } from '../workiis/service/workiis.service';
import { Observable, map, combineLatest, Subscription } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../../auth/services/user.service';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { select, Store } from '@ngrx/store';
import { WorkiiActions } from '../workiis/state/actions/workii.actions';
import { IAppState } from 'src/app/core/state/app.state';
import { selectCurrentWorkii, selectListApplications } from '../workiis/state/selectors/workii.selectors';

@Component({
  selector: 'workii-detail',
  templateUrl: './workii-detail.component.html',
  styleUrls: ['./workii-detail.component.scss']
})
export class WorkiiDetailComponent {

  //@ViewChild('containerInfo') containerInfo!: ElementRef;

  userCurrentId!: string;
  isOwner!: boolean;
  applies!: IApplicationUser[];
  info: boolean = false;
  applications$: Observable<readonly IApplicationUser[]> = new Observable<readonly IApplicationUser[]>();
  workii$!: Observable<IWorkii | null>;

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private store: Store<IAppState>) {}

  ngOnInit(): void {

    this.userCurrentId = this.userService.getCurrentUser()
    const slug = this.route.snapshot.paramMap.get('slug')!;

    this.store.dispatch(WorkiiActions.loadWorkii({ slug }));

    this.workii$ = this.store.select(selectCurrentWorkii)


  }

  infoOpen() {
    this.info = !this.info
  }

  shareWorkii(event: Event) {
    event.stopPropagation()
  }
}
