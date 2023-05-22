import { Injectable } from '@angular/core';
import { IWorkiiCreate } from '../interfaces/workii.interface';

@Injectable({
	providedIn: 'root'
})
export class SharedWorkiiService {
	private workii: IWorkiiCreate | undefined;

	setWorkii(workii: IWorkiiCreate): void {
		this.workii = workii;
		console.log(workii.name);
	}

	getWorkii(): IWorkiiCreate | undefined {
		console.log(this.workii?.name);

		return this.workii;
	}
}
