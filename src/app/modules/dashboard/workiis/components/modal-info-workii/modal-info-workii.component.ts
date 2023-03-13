import { HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, Subscription, combineLatest, pipe } from 'rxjs';
import { IResponseError } from 'src/app/core/interfaces/responseError.inteface';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { IAppState } from 'src/app/core/state/app.state';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';
import { UserService } from 'src/app/modules/auth/services/user.service';
import Swal from 'sweetalert2';
import { IApplication, IApplicationResponse, IApplicationUser, IWorkiiCreate } from '../../interfaces/workii.interface';
import { SharedWorkiiService } from '../../service/shareWorkii.service';
import { WorkiisService } from '../../service/workiis.service';
import { WorkiiActions } from '../../state/actions/workii.actions';
import { selectListApplications, selectListWorkiis, selectWorkiis } from '../../state/selectors/workii.selectors';

@Component({
  selector: 'modal-info-workii',
  templateUrl: './modal-info-workii.component.html',
  styleUrls: ['./modal-info-workii.component.scss']
})
export class ModalInfoWorkiiComponent {

  @Input()
  workii!: IWorkii;

  applications$!: Observable<readonly IApplicationUser[]>;
  workiis$!: Observable<readonly IWorkii[]>

  @Input()
  applicationId!: string;

  @Input()
  index!: number;

  @Input()
  userCurrentId!: string;

  constructor(private modalService: SwitchService,
    private router: Router,
    private sharedWorkiiService: SharedWorkiiService,
    private store: Store<IAppState>) {}

  ngOnInit() {
    this.applications$ = this.store.select(selectListApplications);

    this.workiis$ = this.store.select(selectListWorkiis);
  }

  workiisInApplications(): Observable<readonly boolean[]> {
    return combineLatest([this.workiis$, this.applications$]).pipe(
      map(([workiis, applications]) => {
        const applyWorkiiIds = applications.map(apply => apply.workii.id);
        return workiis.map(workii => applyWorkiiIds.includes(workii.id));
      })
    );
  }

  closeModal() {
    this.modalService.$modal.emit(false)
  }

  stopPropagation (event: Event) {
    event.stopPropagation();
  }

  shareWorkii() {
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
    }

    this.sharedWorkiiService.setWorkii(workii);
  }

  detailsWorkiiNavigate() {
    const ruta = `/dashboard/workiis/${this.workii?.slug}`;
    this.router.navigate([ruta]);
  }

  async applyWorkii(workii: string | undefined) {
    console.log(workii);

    console.log('click');

    this.store.dispatch(WorkiiActions.applyToWorkii({user: this.userCurrentId, workii: workii!}))
  }

  async removeApplication(workii: string) {
    this.store.dispatch(WorkiiActions.deleteApplicationRequest(this.applicationId, workii))
  }

  deleteWorkii(id: string) {
    this.store.dispatch(WorkiiActions.deleteWorkiiRequest(id))
  }
}
