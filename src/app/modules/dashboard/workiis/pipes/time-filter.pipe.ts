import { Pipe, PipeTransform } from '@angular/core';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { IWorkiiInfo } from '../workiis.component';

@Pipe({
	name: 'timeFilter'
})
export class TimeFilterPipe implements PipeTransform {
	transform(workiis: (IWorkii & IWorkiiInfo)[], timeFilter: (string | number)[]): (IWorkii & IWorkiiInfo)[] {
		if (!workiis || !timeFilter || timeFilter.length === 0) {
			return workiis;
		}

		return workiis.filter((workii) => timeFilter.includes(workii.executionTime));
	}
}
