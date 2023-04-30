import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';
import { IApplicationUser } from '../../interfaces/workii.interface';

import { Store } from '@ngrx/store';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { IAppState } from '../../../../../core/state/app.state';
import { WorkiiInfo } from '../../workiis.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'workiis-cards',
  templateUrl: './workiis-cards.component.html',
  styleUrls: ['./workiis-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkiisCardsComponent {

  private modalService = inject(SwitchService)

  @Input()
  workiis!: (IWorkii & WorkiiInfo)[];

  @Input()
  searchWorkiis!: (IWorkii & WorkiiInfo)[];

  @Input()
  applications!: readonly IApplicationUser[];

  @Input()
  isFilterOpened!: boolean;

  @Input()
  userCurrentId!: string;

  @Input()
  searchControl!: FormControl<string>;

  applicationId!: string;
  modalSwitch: boolean = false;
  selectedWorkii!: IWorkii;
  index!: number;

  ngOnInit(): void {
    this.modalService.$modal.subscribe((valor) => {
      this.modalSwitch = valor
    })
  }

  openModal(workii: IWorkii, index: number, applies: readonly IApplicationUser[]): void {
    this.modalSwitch = true
    this.selectedWorkii = workii;
    this.index = index;

    applies.map(apply => {
      workii.id.includes(apply.workii.id)
        ? this.applicationId = apply.id!
        : ''
    })
  }

  shouldDisplayContent(): boolean | undefined {
    return this.searchWorkiis && this.searchControl.value !== '';
  }

  notDisplayContent(): boolean | undefined {
    return this.searchControl.value === null || this.searchControl.value === '';
  }


  ngDestroy() {
    this.modalService.$modal.unsubscribe();
  }
}


