import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../../services/switch.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  modalSwith: boolean = false;
  modalSubscription!: Subscription;

  constructor(private modalService: SwitchService) { }

  ngOnInit(): void {
   this.modalSubscription= this.modalService.$modal.subscribe((valor) => {
      this.modalSwith = valor
    })
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  openModal(): void {
    this.modalSwith = true
  }

  closeModal() {
    this.modalService.$modal.emit(false)
  }
}
