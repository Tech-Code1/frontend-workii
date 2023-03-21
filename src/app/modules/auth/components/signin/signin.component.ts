import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { loginDTO } from '../../DTOs/loginDTO';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../core/state/app.state';
import { UiActions } from 'src/app/shared/state/actions/ui.actions';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  validForm!: boolean;
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
    this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading
      console.log('Cargando subs');

    });
  }

  login() {

    if(!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const {email, password} = this.loginForm.value

    this.authService.login({email, password})
    .subscribe( ok => {

      console.log(ok);

      if(ok === true) {
        this.router.navigateByUrl('/dashboard/workiis')
        this.userExists = true;
      } else {
        //Swal.fire('Error', ok, 'error')
        this.userExists = false;
      }
    })

  }
}
