import { Pipe, PipeTransform } from '@angular/core';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { IWorkiiInfo } from '../workiis.component';

@Pipe({
	name: 'targetFilter'
})
export class TargetFilterPipe implements PipeTransform {
	transform(workiis: (IWorkii & IWorkiiInfo)[], targetsFilter: string[] | null): (IWorkii & IWorkiiInfo)[] {
		if (!workiis || !targetsFilter || targetsFilter.length === 0) {
			return workiis;
		}

		return workiis.filter((workii) => targetsFilter.includes(workii.target));
	}
}
