import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, filter, forkJoin, map, Observable, of, tap, switchMap } from 'rxjs';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';
import { IApplicationUser, IWorkii } from '../../interfaces/workii.interface';
import { SharedWorkiiService } from '../../service/shareWorkii.service';
import { WorkiisService } from '../../service/workiis.service';
import { UserService } from '../../../../auth/services/user.service';

@Component({
  selector: 'workiis-cards',
  templateUrl: './workiis-cards.component.html',
  styleUrls: ['./workiis-cards.component.scss']
})
export class WorkiisCardsComponent {

  modalSwitch: boolean = false;
  workiis: IWorkii[] = []
  selectedWorkii: any;
  isApply!: string[];
  userCurrentId!: string;
  index!: number;
  isOwner!: boolean[];

  constructor(private modalService: SwitchService,
    private workiisService: WorkiisService,
    private sharedWorkiiService: SharedWorkiiService,
    private userService: UserService) {}

  ngOnInit(): void {
    this.modalService.$modal.subscribe((valor) => {
      this.modalSwitch = valor
    })

    this.userCurrentId = this.userService.getCurrentUser()


    this.getWorkiis(20, 0).pipe(
      filter((workiis: IWorkii[]) => workiis.length > 0),
      map(workiis => {
        const foundArray = workiis.map(workii => workii.user.id.includes(this.userCurrentId));

        return {
          found: foundArray,
          workiis
        };
      })
    ).subscribe(({found, workiis}) => {
      this.isOwner = found;
      this.workiis = workiis;
      console.log(this.isOwner);
      console.log(this.workiis);
    });


    this.findAllApplicationsWorkiiByUser(this.userCurrentId)
    .pipe(
      map(applies => {
        const userApplies = applies.map(apply => apply.workii.id)

        return userApplies
      })
    ).subscribe((userApplies) => {

      this.isApply = userApplies
      console.log(userApplies);
    })


  }

  /* onWorkiiSelected(workiiId: string) {
    this.workiiSelected.emit(workiiId);
  } */

  openModal(workii: IWorkii, index: number): void {
    this.modalSwitch = true
    this.selectedWorkii = workii;
    this.index = index;
  }

  getWorkiis(limit: number, offset: number): Observable<IWorkii[]> {

    // Obtener el token de autorización
    const token = localStorage.getItem('token');

    // Crear el encabezado de la solicitud HTTP
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.workiisService.getWorkiis(limit, offset, headers)


  }

  findAllApplicationsWorkiiByUser(id: string): Observable<IApplicationUser[]> {

    return this.workiisService.findAllApplicationsWorkiiByUser(id)
  }
}
