import { Pipe, PipeTransform } from '@angular/core';
import { IWorkii } from '../../../../core/models/workii.interface';

@Pipe({
	name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
	transform(workiis: IWorkii[], searchResults: IWorkii[]): IWorkii[] {
		if (!searchResults || searchResults.length === 0) {
			return workiis;
		}

		return workiis.filter((workii) => searchResults.some((result) => result.name === workii.name));
	}
}
