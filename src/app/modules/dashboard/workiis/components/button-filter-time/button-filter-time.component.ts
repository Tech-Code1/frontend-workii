import { Component, OnInit, Input, QueryList, ElementRef, inject } from '@angular/core';
import { TimeService } from '../../service/timeService.service';

@Component({
  selector: 'button-filter-time',
  templateUrl: './button-filter-time.component.html',
  styleUrls: ['./button-filter-time.component.scss']
})
export class ButtonFilterTimeComponent implements OnInit {

  public timeService = inject(TimeService)

  @Input()
  checkedInputs!: QueryList<ElementRef<HTMLInputElement>>

  constructor() { }

  ngOnInit(): void {
  }


  deleteTime() {
    this.checkedInputs.forEach((checkedInput: ElementRef) => {
      checkedInput.nativeElement.checked = false;
    });

    this.timeService.updateSelectedTime([]);
  }

}
