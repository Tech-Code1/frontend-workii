import { Component, Input } from '@angular/core';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';
import { IWorkii } from '../../interfaces/workii.interface';

@Component({
  selector: 'modal-info-workii',
  templateUrl: './modal-info-workii.component.html',
  styleUrls: ['./modal-info-workii.component.scss']
})
export class ModalInfoWorkiiComponent {

  @Input()
  workii!: IWorkii;

  constructor(private modalService: SwitchService) {}

  closeModal() {
    this.modalService.$modal.emit(false)
  }

  stopPropagation (event: Event) {
    event.stopPropagation();
  }
}
