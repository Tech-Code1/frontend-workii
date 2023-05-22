import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../../core/state/actions/user.actions';
import { IAppState } from '../../../../core/state/app.state';

@Component({
	selector: 'validate-otp',
	templateUrl: './validate-otp.component.html',
	styleUrls: ['./validate-otp.component.scss']
})
export class ValidateOtpComponent {
	private formBuilder = inject(FormBuilder);
	private store = inject(Store<IAppState>);

	/*  @Output()
  cancel: EventEmitter<void> = new EventEmitter<void>(); */

	otpForm: FormGroup = this.formBuilder.group({
		otp: ['', [Validators.required, Validators.maxLength(100)]]
	});

	isValid(inputName: string): boolean | undefined | void {
		if (this.otpForm.get(inputName)?.touched) {
			return this.otpForm.get(inputName)?.valid;
		}
		return true;
	}

	validateOtp(): void {
		if (!this.otpForm.valid) {
			this.otpForm.markAllAsTouched();
		}

		const { otp } = this.otpForm.value;

		this.store.dispatch(UserActions.validateOtp({ otp }));
	}

	cancelOtp(): void {
		this.store.dispatch(UserActions.userFound());
	}
}
