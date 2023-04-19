import { Component, OnInit, inject } from '@angular/core';
import { TargetService } from '../../service/targetService.service';

@Component({
  selector: 'input-filter-target',
  templateUrl: './input-filter-target.component.html',
  styleUrls: ['./input-filter-target.component.scss']
})
export class InputFilterTargetComponent implements OnInit {

  public targetService = inject(TargetService)
  targets: string[] = [
    'Arte',
    'Informatica',
    'Humanidades',
    'Ciencias',
    'Ingenieria',
    'Entretenimiento',
    'Comunicaciones',
    'Marketing',
    'Otro'];

  constructor() { }

  ngOnInit(): void {
  }

  onTargetChange(target: string, checked: boolean): void {

    if (checked) {
      const updatedSelectedTargets = [...this.targetService.getSelectedTargets$().value, target];
      this.targetService.updateSelectedTargets(updatedSelectedTargets);
    } else {
      const updatedSelectedTargets = this.targetService.getSelectedTargets$().value.filter(t => t !== target);
      this.targetService.updateSelectedTargets(updatedSelectedTargets);
    }
  }
}
