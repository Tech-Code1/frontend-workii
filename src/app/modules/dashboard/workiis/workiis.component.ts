import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SwitchService } from '../../auth/services/switch.service';
import { UserService } from '../../auth/services/user.service';
import { IApplicationUser } from './interfaces/workii.interface';
import { WorkiisService } from './service/workiis.service';

@Component({
  selector: 'app-workiis',
  templateUrl: './workiis.component.html',
  styleUrls: ['./workiis.component.scss'],
})
export class WorkiisComponent implements OnInit {

  userCurrentId!: string;
  isApplyWorkiiId!: string[];
  modalSwitch: boolean = false;

  constructor(private modalService: SwitchService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userCurrentId = this.userService.getCurrentUser()

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
