import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginDTO } from '../../DTOs/loginDTO';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {

  email!: string | undefined;

  registerStep2:FormGroup  = this.formBuilder.group({
    nick: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    repeatPass: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
  })

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.email = this.authService.loginEmail
  }


  isValid(inputName: string): boolean | undefined | void {
    if (this.registerStep2.get(inputName)?.touched) {

      return this.registerStep2.get(inputName)?.valid
    }
    return true
  }


  login() {
    console.log('enviado');

  }
}
