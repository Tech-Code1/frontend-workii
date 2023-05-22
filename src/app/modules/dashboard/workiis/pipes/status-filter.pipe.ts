import { Pipe, PipeTransform } from '@angular/core';
import { IWorkii } from 'src/app/core/models/workii.interface';
import { WorkiiInfo } from '../workiis.component';
import { IApplicationUser } from '../interfaces/workii.interface';

@Pipe({
	name: 'statusFilter'
})
export class StatusFilterPipe implements PipeTransform {
	transform(
		workiis: (IWorkii & WorkiiInfo)[],
		selectedStatus: string[],
		applications: readonly IApplicationUser[],
		userCurrentId: string
	): (IWorkii & WorkiiInfo)[] {
		if (!workiis || !selectedStatus || selectedStatus.length === 0) {
			return workiis;
		}

		const applyWorkiiIds = applications.map((apply) => apply.workii.id);

		return workiis.filter((workii) => {
			const isApplied = applyWorkiiIds.includes(workii.id);
			const isCreatedByCurrentUser = userCurrentId === workii.user.id;

			if (selectedStatus.includes('Publicados') && isCreatedByCurrentUser) {
				return true;
			}

			if (selectedStatus.includes('Aplicados') && !isCreatedByCurrentUser && isApplied) {
				return true;
			}

			if (selectedStatus.includes('Disponibles') && !isCreatedByCurrentUser && !isApplied) {
				return true;
			}

			return false;
		});
	}
}
