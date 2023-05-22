import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SwitchService {
	$modal = new EventEmitter<boolean>();
}
