import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';

@Component({
  selector: 'modal-info-workii',
  templateUrl: './modal-info-workii.component.html',
  styleUrls: ['./modal-info-workii.component.scss']
})
export class ModalInfoWorkiiComponent {

  initialValue: string = "";
  inputChanged = false;

  changeEmail!: FormGroup;

  constructor(private modalService: SwitchService) {}

  closeModal() {
    this.modalService.$modal.emit(false)
  }

  stopPropagation (event: Event) {
    event.stopPropagation();
  }
}
