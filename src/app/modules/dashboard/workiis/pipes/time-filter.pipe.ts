import { Pipe, PipeTransform } from '@angular/core';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { WorkiiInfo } from '../workiis.component';

@Pipe({
  name: 'timeFilter'
})
export class TimeFilterPipe implements PipeTransform {
  transform(workiis: (IWorkii & WorkiiInfo)[], timeFilter: (string | number)[]): (IWorkii & WorkiiInfo)[] {
    if (!workiis || !timeFilter || timeFilter.length === 0) {
      return workiis;
    }

    return workiis.filter(workii => timeFilter.includes(workii.executionTime));
  }
}
