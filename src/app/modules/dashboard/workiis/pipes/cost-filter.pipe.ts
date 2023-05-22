import { Pipe, PipeTransform } from '@angular/core';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { IWorkiiInfo } from '../workiis.component';

@Pipe({
	name: 'costFilter'
})
export class CostFilterPipe implements PipeTransform {
	transform(workiis: (IWorkii & IWorkiiInfo)[], sortOrder: string): (IWorkii & IWorkiiInfo)[] {
		if (!workiis || !sortOrder) {
			return workiis;
		}

		return workiis.sort((a, b) => {
			if (sortOrder === 'asc') {
				return a.cost - b.cost;
			} else if (sortOrder === 'desc') {
				return b.cost - a.cost;
			} else {
				return 0;
			}
		});
	}
}
