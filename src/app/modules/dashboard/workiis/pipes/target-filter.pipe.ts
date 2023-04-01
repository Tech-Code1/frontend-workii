import { Pipe, PipeTransform } from '@angular/core';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { WorkiiInfo } from '../workiis.component';

@Pipe({
  name: 'targetFilter'
})
export class TargetFilterPipe implements PipeTransform {
  transform(workiis: (IWorkii & WorkiiInfo)[], targetsFilter: string[] | null): (IWorkii & WorkiiInfo)[] {
    if (!workiis || !targetsFilter || targetsFilter.length === 0) {
      return workiis;
    }

    return workiis.filter(workii => targetsFilter.includes(workii.target));
  }
}

