import { ChangeDetectionStrategy, Component, Input, inject, Output, EventEmitter } from '@angular/core';
import { SwitchService } from 'src/app/modules/auth/services/switch.service';
import { IApplicationUser } from '../../interfaces/workii.interface';

import { IWorkii } from 'src/app/core/models/workii.interface';
import { WorkiiInfo } from '../../workiis.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'workiis-cards',
  templateUrl: './workiis-cards.component.html',
  styleUrls: ['./workiis-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkiisCardsComponent {

  @Input() workiis!: (IWorkii & WorkiiInfo)[];
  @Input() searchWorkiis!: (IWorkii & WorkiiInfo)[];
  @Input() applications!: readonly IApplicationUser[];
  @Input() isFilterOpened!: boolean;
  @Input() userCurrentId!: string;
  @Input() searchControl!: FormControl<string>;

  totalPagesListWorkiis: number = 0;
  pagesWorkiis: number[] = [];
  modalSwitch: boolean = false;

  shouldDisplayContent(): boolean | undefined {
    return this.searchWorkiis && this.searchControl.value !== '';
  }

  notDisplayContent(): boolean | undefined {
    return this.searchControl.value === null || this.searchControl.value === '';
  }
}


