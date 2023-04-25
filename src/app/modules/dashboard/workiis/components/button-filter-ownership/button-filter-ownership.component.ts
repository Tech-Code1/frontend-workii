import { Component, OnInit, inject, Input, QueryList, ElementRef } from '@angular/core';
import { StatusService } from '../../service/statusService.service';

@Component({
  selector: 'button-filter-ownership',
  templateUrl: './button-filter-ownership.component.html',
  styleUrls: ['./button-filter-ownership.component.scss']
})
export class ButtonFilterOwnershipComponent implements OnInit {

  public statusService = inject(StatusService)

  @Input()
  checkedInputsStatus!: QueryList<ElementRef<HTMLInputElement>>

  ngOnInit(): void {
  }


  deleteStatus() {
    this.checkedInputsStatus.forEach((checkedInput: ElementRef) => {
      checkedInput.nativeElement.checked = false;
    });
    this.statusService.updateSelectedStatus([]);
  }
}
