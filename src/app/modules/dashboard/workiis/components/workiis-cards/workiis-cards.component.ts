import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, filter, Observable, of, tap } from 'rxjs';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';
import { IWorkii } from '../../interfaces/workii.interface';
import { WorkiisService } from '../../service/workiis.service';

@Component({
  selector: 'workiis-cards',
  templateUrl: './workiis-cards.component.html',
  styleUrls: ['./workiis-cards.component.scss']
})
export class WorkiisCardsComponent {

  modalSwitch: boolean = false;
  workiis: IWorkii[] = []
  slug!: IWorkii;
  selectedWorkii: any;

  constructor(private modalService: SwitchService,
    private workiisService: WorkiisService) {}

  ngOnInit(): void {
    this.modalService.$modal.subscribe((valor) => {
      this.modalSwitch = valor
    })

    this.getWorkiis(2, 0).pipe
    (filter((workiis: IWorkii[]) => workiis.length > 0))
    .subscribe(workiis => {
      console.log(workiis);

      this.workiis = workiis;
    });
  }

  openModal(workii: IWorkii): void {
    this.modalSwitch = true
    this.selectedWorkii = workii;
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

  /* getWorkii(slug: string): Observable<IWorkii[]> {

    // Obtener id del workii
    const idWorkii = this.workiisService


    return this.workiisService.getWorkiis(limit, offset, headers)

  } */

}
