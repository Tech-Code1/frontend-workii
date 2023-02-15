import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'validate-otp',
  templateUrl: './validate-otp.component.html',
  styleUrls: ['./validate-otp.component.scss']
})
export class ValidateOtpComponent {

  @Input()
  userExists!: boolean;

  @Output()
  cancel: EventEmitter<void> = new EventEmitter<void>();

  otpForm:FormGroup  = this.formBuilder.group({
    otp: ['', [Validators.required, Validators.maxLength(100)]],
  })

  constructor(private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
    private router: Router,
    private authService: AuthService,
    ) {}


  isValid(inputName: string): boolean | undefined | void {
    if (this.otpForm.get(inputName)?.touched) {

      return this.otpForm.get(inputName)?.valid
    }
    return true
  }

  validateOtp() {
    if(!this.otpForm.valid) {
      this.otpForm.markAllAsTouched();
    }

    const {otp} = this.otpForm.value

    this.authService.validateOtp(otp)
    .subscribe(ok => {

      if (ok) {
        this.router.navigateByUrl('/auth/step2')
      } else {
        Swal.fire('Error', "OTP inválido. Por favor, vuelva a intentarlo.", 'error')
      }
    })
  }


  cancelOtp() {
    this.cancel.emit()
    console.log(this.userExists);
  }
}
