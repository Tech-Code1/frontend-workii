import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../../services/switch.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  modalSwith: boolean = false;

  constructor(private modalService: SwitchService) { }

  ngOnInit(): void {
    this.modalService.$modal.subscribe((valor) => {
      this.modalSwith = valor
    })
  }

  openModal(): void {
    this.modalSwith = true
  }

  closeModal() {
    this.modalService.$modal.emit(false)
  }
}
