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
  private renderer = inject(Renderer2)

  @ViewChildren('checked') checkedInputs!: QueryList<ElementRef<HTMLInputElement>>;

  combined$!: Observable<{ applications: readonly IApplicationUser[]; workiis: readonly IWorkii[] }>;
  workiisInApplications$!: Observable<WorkiiInfo[]>;
  checked: boolean[] = [];
  userCurrentId!: string;
  isApplyWorkiiId!: string[];
  modalSwitch: boolean = false;
  isFilterOpened: boolean = true;
  workiis$: Observable<readonly IWorkii[]> = new Observable<readonly IWorkii[]>();
  applications$: Observable<readonly IApplicationUser[]> = new Observable<readonly IApplicationUser[]>();
  selectedTargets$ = new BehaviorSubject<string[]>([]);
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
      this.checked.push(checked)
      this.newSelectedTargets = [...this.selectedTargets$.value, target];
    } else {
      this.newSelectedTargets = this.selectedTargets$.value.filter(t => t !== target);
    }

    this.selectedTargets$.next(this.newSelectedTargets);
  }

  deleteTarget() {
    //console.log(this.checkedInputs.map(e => e.nativeElement.checked));

    this.checkedInputs.forEach((checkedInput: ElementRef) => {
      checkedInput.nativeElement.checked = false;
    });

    this.newSelectedTargets = []
    this.selectedTargets$.next(this.newSelectedTargets)
  }
}
