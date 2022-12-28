import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {

  registerStep3:FormGroup  = this.formBuilder.group({
    areas: ['', [Validators.required]],
    profession: ['', [Validators.required]],
  })

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
  }


  isValid(inputName: string): boolean | undefined | void {
    if (this.registerStep3.get(inputName)?.touched) {

      return this.registerStep3.get(inputName)?.valid
    }
    return true
  }

  login() {
    console.log('finalizado');

  }
}
