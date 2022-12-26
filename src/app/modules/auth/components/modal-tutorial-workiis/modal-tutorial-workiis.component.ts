import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SwitchService } from '../../services/switch.service';

@Component({
  selector: 'modal-tutorial-workiis',
  templateUrl: './modal-tutorial-workiis.component.html',
  styleUrls: ['./modal-tutorial-workiis.component.scss']
})
export class ModalTutorialWorkiisComponent {

  initialValue: string = "";
  inputChanged = false;
  step = 1;
  right: boolean = false;
  left: boolean = false;

  changeEmail!: FormGroup;

  constructor(private modalService: SwitchService ) {}


  closeModal() {
    this.modalService.$modal.emit(false)
  }

  stopPropagation (event: Event) {
    event.stopPropagation();
  }

  plusStep() {
    if(this.step < 4)
    this.step ++
    console.log(this.step);
    this.right = true
  }

  minusStep() {
    if(this.step > 1)
    this.step --
    console.log(this.step);
    this.left = true
  }

  currencyStep(step: number) {
    this.step = step;
  }
}
