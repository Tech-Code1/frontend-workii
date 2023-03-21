import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { loginDTO } from '../../DTOs/loginDTO';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../core/state/app.state';
import { UiActions } from 'src/app/shared/state/actions/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {

  validForm!: boolean;
  uiSubscription!: Subscription;
  loading: boolean = false;
  userExists: boolean = true;
  loginForm:FormGroup  = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern), Validators.maxLength(100)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
  })

  constructor(private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
    private router: Router,
    private authService: AuthService,
    private store: Store<IAppState>) {}


  isValid(inputName: string): boolean | undefined | void {
    if (this.loginForm.get(inputName)?.touched) {

      return this.loginForm.get(inputName)?.valid
    }
    return true
  }

  ngOnInit() {
   this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading
      console.log('Cargando subs');

    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  login() {

    if(!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.store.dispatch(UiActions.isLoading())

    const {email, password} = this.loginForm.value

    this.authService.login({email, password})
    .subscribe( ok => {

      console.log(ok);

      if(ok === true) {
        this.router.navigateByUrl('/dashboard/workiis')
        this.store.dispatch(UiActions.stopLoading());
        this.userExists = true;
      } else {
        this.store.dispatch(UiActions.stopLoading());
        //Swal.fire('Error', ok, 'error')
        this.userExists = false;
      }
    })

  }
}
