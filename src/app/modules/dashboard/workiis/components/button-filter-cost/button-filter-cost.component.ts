import { Component, Input, OnInit, inject, ElementRef, QueryList } from '@angular/core';
import { CostService } from '../../service/costService.service';

@Component({
  selector: 'button-filter-cost',
  templateUrl: './button-filter-cost.component.html',
  styleUrls: ['./button-filter-cost.component.scss']
})
export class ButtonFilterCostComponent implements OnInit {

  public costService = inject(CostService)

  @Input()
  checkedInputsCost!: QueryList<ElementRef<HTMLInputElement>>

  ngOnInit(): void {
  }

  deleteCost() {
    this.checkedInputsCost.forEach((checkedInput: ElementRef) => {
      checkedInput.nativeElement.checked = false;
    });
    this.costService.updateSelectedCost('');
  }
}
