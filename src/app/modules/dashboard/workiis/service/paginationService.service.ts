import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PaginationService {
	private _currentPage = new BehaviorSubject<number>(1);
	currentPage$ = this._currentPage;

	changePage(page: number) {
		this._currentPage.next(page);
	}
}
