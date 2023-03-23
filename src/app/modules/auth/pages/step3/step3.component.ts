import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { parseErrorsFromResponse } from 'src/app/shared/utils/parseErrorsFromResponse';
import Swal from 'sweetalert2';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {

  registerStep3:FormGroup  = this.formBuilder.group({
    areaOfExpertise: ["", [Validators.required]],
    profession: ["", [Validators.required]],
  })

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router:Router,) { }

  ngOnInit(): void {
  }


  isValid(inputName: string): boolean | undefined | void {
    if (this.registerStep3.get(inputName)?.touched) {

      return this.registerStep3.get(inputName)?.valid
    }
    return true
  }

  onSubmit() {
    if (!this.registerStep3.valid) {
      return;
    }

    this.registerService.AddInfoUser(this.registerStep3.value);
    this.registerService.finishUserCreation().subscribe(
      {
        next: user => {
          this.router.navigate(['/dashboard/workiis']);
          Swal.fire('Se ha creado el usuario correctamente');
        },
        error:err => {
          console.log(err);

          let errors = parseErrorsFromResponse(err);

          console.log(errors);

          Swal.fire('Error',`Han ocurrido los siguientes errores:\n ${errors.join('\n')}`,'error');
          this.router.navigate(['/auth']);
        }
      })
  }
}
