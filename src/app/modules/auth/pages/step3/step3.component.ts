import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserActions } from 'src/app/core/state/actions/user.actions';
import { IAppState } from '../../../../core/state/app.state';
import { RegisterService } from '../../services/register.service';

@Component({
	selector: 'app-step3',
	templateUrl: './step3.component.html',
	styleUrls: ['./step3.component.scss']
})
export class Step3Component {
	private formBuilder = inject(FormBuilder);
	private registerService = inject(RegisterService);
	private store = inject(Store<IAppState>);

	registerStep3: FormGroup = this.formBuilder.group({
		areaOfExpertise: ['', [Validators.required]],
		profession: ['', [Validators.required]]
	});

	isValid(inputName: string): boolean | undefined | void {
		if (this.registerStep3.get(inputName)?.touched) {
			return this.registerStep3.get(inputName)?.valid;
		}
		return true;
	}

	onSubmit(): void {
		if (!this.registerStep3.valid) {
			return;
		}

		this.registerService.AddInfoUser(this.registerStep3.value);

		this.store.dispatch(UserActions.registerUser());
	}
}
