import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';

@Component({
  selector: 'modal-create-workii',
  templateUrl: './modal-create-workii.component.html',
  styleUrls: ['./modal-create-workii.component.scss']
})
export class ModalCreateWorkiiComponent {

  initialValue: string = "";
  inputChanged = false;

  changeEmail!: FormGroup;

  constructor(private modalService: SwitchService ) {}


  closeModal() {
    this.modalService.$modal.emit(false)
  }

  stopPropagation (event: Event) {
    event.stopPropagation();
  }
}
