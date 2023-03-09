import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, filter, forkJoin, map, Observable, of, tap, switchMap } from 'rxjs';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';
import { IApplicationUser } from '../../interfaces/workii.interface';
import { SharedWorkiiService } from '../../service/shareWorkii.service';
import { WorkiisService } from '../../service/workiis.service';
import { UserService } from '../../../../auth/services/user.service';
import { ActionsSubject, Store } from '@ngrx/store';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { IWokiiState } from 'src/app/core/models/workii.state';
import { WorkiiActions } from '../../state/actions/workii.actions';
//import { loadWorkiis } from '../../state/actions/workii.actions';
import { selectListWorkiis, selectLoading } from '../../state/selectors/workii.selectors';
import { IAppState } from '../../../../../core/state/app.state';
import { TypedAction } from '@ngrx/store/src/models';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'workiis-cards',
  templateUrl: './workiis-cards.component.html',
  styleUrls: ['./workiis-cards.component.scss']
})
export class WorkiisCardsComponent {

  loading$: Observable<boolean> = new Observable<boolean>();
  workiis$: Observable<readonly IWorkii[]> = this.store.select(state => state.workiis.workiis)
  //found$: Observable<boolean[] | undefined> = this.store.select(state => state.workiis.found)
  isOwner$!: Observable<boolean[]>;
  //isOwner$: Observable<boolean[]> = this.store.select(state => state.workiis.found);

  @Input()
  isApplyWorkiiId!: string[];

  applies!: IApplicationUser[];
  modalSwitch: boolean = false;
  selectedWorkii: any;
  userCurrentId!: string;
  index!: number;
  apply!: string;

  constructor(private modalService: SwitchService,
    private workiisService: WorkiisService,
    private sharedWorkiiService: SharedWorkiiService,
    private userService: UserService,
    private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading)

    this.store.dispatch(WorkiiActions.loadWorkiis())

    console.log(this.isOwner$)

    //this.store.dispatch({type: '[Workii Page] list workiis'})



    /* this.workiisService.getWorkiis(20, 0).pipe(
      filter((workiis: IWorkii[]) => workiis.length > 0),
      map(workiis => {
        const foundArray = workiis.map(workii => workii.user.id.includes(this.userCurrentId));

        return {
          found: foundArray,
          workiis
        };
      })
    ).subscribe(({found, workiis}) => {
      this.store.dispatch(WorkiiActions.listWorkiis(workiis))
      this.workiis$ = this.store.select(selectListWorkiis)
      this.isOwner = found;
    }); */


    this.modalService.$modal.subscribe((valor) => {
      this.modalSwitch = valor
    })

    this.userCurrentId = this.userService.getCurrentUser()

    this.findAllApplicationsWorkiiByUser(this.userCurrentId)
    .pipe(
      map(applies => {
        //const applyId = applies.map(apply => apply.id);
        const userApplies = applies.map(apply => apply.workii.id)

        return {userApplies, applies}
      })
    ).subscribe(({userApplies, applies}) => {

      this.isApplyWorkiiId = userApplies
      this.applies = applies
    })

  }

  openModal(workii: IWorkii, index: number, applies: IApplicationUser[]): void {


    this.modalSwitch = true
    this.selectedWorkii = workii;
    this.index = index;

    applies.forEach(apply => {
      if (apply.workii.id.match(workii?.id!)) {
        this.apply = apply.id
      }
    })

  }

  findAllApplicationsWorkiiByUser(id: string): Observable<IApplicationUser[]> {

    return this.workiisService.findAllApplicationsWorkiiByUser(id)
  }
}
