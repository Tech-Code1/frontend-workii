import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { parseErrorsFromResponse } from 'src/app/shared/utils/parseErrorsFromResponse';
import Swal from 'sweetalert2';
import { RegisterService } from '../../services/register.service';
import { IAppState } from '../../../../core/state/app.state';
import { UserActions } from 'src/app/core/state/actions/user.actions';

@Component({
	selector: 'app-step3',
	templateUrl: './step3.component.html',
	styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {
	private formBuilder = inject(FormBuilder);
	private registerService = inject(RegisterService);
	private store = inject(Store<IAppState>);

	registerStep3: FormGroup = this.formBuilder.group({
		areaOfExpertise: ['', [Validators.required]],
		profession: ['', [Validators.required]]
	});

	ngOnInit(): void {}

	isValid(inputName: string): boolean | undefined | void {
		if (this.registerStep3.get(inputName)?.touched) {
			return this.registerStep3.get(inputName)?.valid;
		}
		return true;
	}

	onSubmit() {
		if (!this.registerStep3.valid) {
			return;
		}

		this.registerService.AddInfoUser(this.registerStep3.value);

		this.store.dispatch(UserActions.registerUser());
	}
}
