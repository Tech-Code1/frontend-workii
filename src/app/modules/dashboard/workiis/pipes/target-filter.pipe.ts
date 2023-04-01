import { Pipe, PipeTransform } from '@angular/core';
import { IWorkii } from 'src/app/core/models/workii.interface';

@Pipe({
  name: 'targetFilter'
})
export class TargetFilterPipe implements PipeTransform {
  transform(workiis: readonly IWorkii[], targetsFilter: string[]): readonly IWorkii[] {
    if (!workiis || !targetsFilter || targetsFilter.length === 0) {
      return workiis;
    }

    return workiis.filter(workii => targetsFilter.includes(workii.target));
  }
}

