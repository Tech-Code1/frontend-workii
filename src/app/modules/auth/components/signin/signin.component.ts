import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  validForm!: boolean;
  loginForm:FormGroup  = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern), Validators.maxLength(100)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
  })

  constructor(private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService) {}


  ngAfterViewChecked(){
    console.log(this.loginForm.get('email')?.valid)
  }

  isValid(inputName: string): boolean | undefined | void {
    if (this.loginForm.get(inputName)?.touched) {

      return this.loginForm.get(inputName)?.valid
    }
    return true
  }

  login() {
    if(!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
    }
  }


}
