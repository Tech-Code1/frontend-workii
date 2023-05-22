import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { SwitchService } from '../../services/switch.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
	private modalService = inject(SwitchService);
	modalSwith: boolean = false;
	modalSubscription!: Subscription;

	ngOnInit(): void {
		this.modalSubscription = this.modalService.$modal.subscribe((valor) => {
			this.modalSwith = valor;
		});
	}

	ngOnDestroy(): void {
		this.modalSubscription.unsubscribe();
	}

	openModal(): void {
		this.modalSwith = true;
	}

	closeModal(): void {
		this.modalService.$modal.emit(false);
	}
}
