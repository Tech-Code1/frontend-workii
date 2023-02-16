import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../../auth/services/switch.service';

@Component({
  selector: 'app-workiis',
  templateUrl: './workiis.component.html',
  styleUrls: ['./workiis.component.scss']
})
export class WorkiisComponent implements OnInit {

  modalSwitch: boolean = false;
  constructor(private modalService: SwitchService) { }

  ngOnInit(): void {
    this.modalService.$modal.subscribe((valor) => {
      this.modalSwitch = valor
    })
  }

  openModal(): void {
    this.modalSwitch = true
  }

  closeModal() {
    this.modalService.$modal.emit(false)
  }
}
