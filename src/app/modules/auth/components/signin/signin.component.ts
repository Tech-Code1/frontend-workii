import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserActions } from 'src/app/core/state/actions/user.actions';
import { selectStatusUser } from 'src/app/core/state/selectors/user.selectors';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { IAppState } from '../../../../core/state/app.state';

@Component({
	selector: 'signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
	private validatorsService = inject(ValidatorsService);
	private formBuilder = inject(FormBuilder);
	private store = inject(Store<IAppState>);

	validForm!: boolean;
	uiSubscription!: Subscription;
	loading: boolean = false;
	userExists$!: Observable<boolean>;

	loginForm: FormGroup = this.formBuilder.group({
		email: [
			'',
			[Validators.required, Validators.pattern(this.validatorsService.emailPattern), Validators.maxLength(100)]
		],
		password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
	});

	isValid(inputName: string): boolean | undefined | void {
		if (this.loginForm.get(inputName)?.touched) {
			return this.loginForm.get(inputName)?.valid;
		}
		return true;
	}

	ngOnInit(): void {
		this.uiSubscription = this.store.select('ui').subscribe((ui) => {
			this.loading = ui.isLoading;
			console.log('Cargando subs');
		});

		this.userExists$ = this.store.select(selectStatusUser);
	}

	ngOnDestroy(): void {
		this.uiSubscription.unsubscribe();
	}

	login(): void {
		if (!this.loginForm.valid) {
			this.loginForm.markAllAsTouched();
			return;
		}

		//this.store.dispatch(UserActions.validateToken());

		const { email, password } = this.loginForm.value;

		this.store.dispatch(UserActions.loginUser(email, password));
	}
}
