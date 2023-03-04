import { HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IResponseError } from 'src/app/core/interfaces/responseError.inteface';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';
import { UserService } from 'src/app/modules/auth/services/user.service';
import Swal from 'sweetalert2';
import { IApplication, IApplicationResponse, IWorkii } from '../../interfaces/workii.interface';
import { SharedWorkiiService } from '../../service/shareWorkii.service';
import { WorkiisService } from '../../service/workiis.service';

@Component({
  selector: 'modal-info-workii',
  templateUrl: './modal-info-workii.component.html',
  styleUrls: ['./modal-info-workii.component.scss']
})
export class ModalInfoWorkiiComponent {

  @Input()
  workii!: IWorkii;

  @Input()
  found!: boolean[];

  @Input()
  index!: number;

  constructor(private modalService: SwitchService,
    private workiisService: WorkiisService,
    private userService: UserService,
    private router: Router,
    private sharedWorkiiService: SharedWorkiiService) {}

  ngOnInit() {
    console.log(this.workii.id)
  }

  closeModal() {
    this.modalService.$modal.emit(false)
  }

  stopPropagation (event: Event) {
    event.stopPropagation();
  }

  shareWorkii() {
    const workii: IWorkii = {
      name: this.workii.name,
      cost: this.workii.cost,
      description: this.workii.description,
      target: this.workii.target,
      toDoList: this.workii.toDoList,
      user: this.workii.user,
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
    const user = await this.userService.getCurrentUser()

    // Obtener el token de autorización
    const token = localStorage.getItem('token');

    // Crear el encabezado de la solicitud HTTP
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const apply: IApplication = {
      user,
      workii : workii!
    }

    console.log(apply);


    return this.workiisService.applyToWorkii(apply, headers)
    .subscribe({
      next: (resp: IApplicationResponse) => {
        console.log(resp.message);

        Swal.fire({
          icon: 'success',
          text: resp.message,
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (resp: IResponseError) => {
        console.log(resp.error?.message);

        Swal.fire({
          icon: 'error',
          title: resp.status,
          text: resp.error?.message
        });
      }
    })
  }
}
