import { HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';
import { IWorkii } from '../../interfaces/workii.interface';
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

  constructor(private modalService: SwitchService,
    private workiisService: WorkiisService,
    private router: Router,
    private sharedWorkiiService: SharedWorkiiService) {}

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
      userId: this.workii.userId,
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
}
