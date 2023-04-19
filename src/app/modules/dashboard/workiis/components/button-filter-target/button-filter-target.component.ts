import { Component, ElementRef, Input, OnInit, QueryList, inject } from '@angular/core';
import { TargetService } from '../../service/targetService.service';

@Component({
  selector: 'button-filter-target',
  templateUrl: './button-filter-target.component.html',
  styleUrls: ['./button-filter-target.component.scss']
})
export class ButtonFilterTargetComponent implements OnInit {

  public targetService = inject(TargetService)

  @Input()
  checkedInputsTarget!: QueryList<ElementRef<HTMLInputElement>>


  constructor() { }

  ngOnInit(): void {
  }


  deleteTarget() {
    this.checkedInputsTarget.forEach((checkedInput: ElementRef) => {
      checkedInput.nativeElement.checked = false;
    });
    this.targetService.updateSelectedTargets([]);
  }
}
