import { Component, OnInit, inject, ViewChildren, QueryList, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { TargetService } from '../../service/targetService.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/core/state/app.state';
import { WorkiiActions } from '../../state/actions/workii.actions';

@Component({
  selector: 'input-filter-target',
  templateUrl: './input-filter-target.component.html',
  styleUrls: ['./input-filter-target.component.scss']
})
export class InputFilterTargetComponent implements OnInit {

  public targetService = inject(TargetService)
  public store = inject(Store<IAppState>)

  @ViewChildren('checked') checkedInputs!: ElementRef<HTMLInputElement>[];


  constructor() { }

  ngOnInit(): void {
  }

}
