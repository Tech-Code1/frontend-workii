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
    private workiisService: WorkiisService,
    private userService: UserService,
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

    this.store.dispatch(WorkiiActions.applyToWorkii({user: this.userCurrentId, workii: workii!}))
    /* const user = await this.userService.getCurrentUser()

    const apply: IApplication = {
      user,
      workii : workii!
    }

    return this.workiisService.applyToWorkii(apply)
    .subscribe({
      next: async(resp: IApplicationResponse) => {

        console.log(resp.message);

        this.closeModal()

        setTimeout(() => {
          location.reload();
        }, 800)

        Swal.fire({
          icon: 'success',
          text: resp.message,
          showConfirmButton: false,
          timer: 2000
        });

      },
      error: (resp: IResponseError) => {
        console.log(resp.error?.message);

        Swal.fire({
          icon: 'error',
          title: resp.status,
          text: resp.error?.message
        });
      },
    }) */
  }

  async removeApplication() {

    this.store.dispatch(WorkiiActions.deleteApplicationSuccess(this.applicationId))

    /* this.workiisService.removeApplication(id)
    .subscribe({
      next: ( response: IApplicationResponse ) => {

        this.closeModal();

        setTimeout(() => {
          location.reload();
        }, 800)

        Swal.fire({
          icon: 'success',
          text: response.message,
          showConfirmButton: false,
          timer: 2000
        });

      },
      error: (resp: IResponseError) => {
        Swal.fire({
          icon: 'error',
          text: resp.error?.message,
          title: resp.status
        });
      }
    }) */
  }

  deleteWorkii(id: string) {

    this.store.dispatch(WorkiiActions.deleteWorkiiRequest(id))

  }
}
