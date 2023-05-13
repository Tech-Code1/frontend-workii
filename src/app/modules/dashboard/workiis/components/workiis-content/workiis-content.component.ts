import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { WorkiiInfo } from '../../workiis.component';
import { IApplicationUser } from '../../interfaces/workii.interface';
import { ToggleLayoutService } from '../../service/toggleLayoutService.service';
import { Observable } from 'rxjs';
import { SwitchService } from 'src/app/modules/auth/services';

@Component({
  selector: 'workiis-content',
  templateUrl: './workiis-content.component.html',
  styleUrls: ['./workiis-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkiisContentComponent {

  private modalService = inject(SwitchService)
  public toggleLayoutService = inject(ToggleLayoutService);

  @Input() workiis!: (IWorkii & WorkiiInfo)[];
  @Input() applications!: readonly IApplicationUser[];
  @Input() userCurrentId!: string;
  @Input() isFilterOpened!: boolean;

  toggleLayout$!: Observable<boolean>;
  applicationId!: string;
  selectedWorkii!: IWorkii;
  index!: number
  modalSwitch: boolean = false;

  ngOnInit(): void {
    this.modalService.$modal.subscribe((valor) => {
      this.modalSwitch = valor
    })

    this.toggleLayout$ = this.toggleLayoutService.toggleLayout$;
  };

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

  ngDestroy() {
    this.modalService.$modal.unsubscribe();
  }
}
