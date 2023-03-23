import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../core/state/app.state';
import { UserActions } from '../../../../core/state/actions/user.actions';
import { selectOtp } from 'src/app/core/state/selectors/user.selectors';
import { UiActions } from 'src/app/shared/state/actions/ui.actions';

@Component({
  selector: 'validate-otp',
  templateUrl: './validate-otp.component.html',
  styleUrls: ['./validate-otp.component.scss']
})
export class ValidateOtpComponent {

  private formBuilder = inject(FormBuilder)
  private store = inject(Store<IAppState>)

 /*  @Output()
  cancel: EventEmitter<void> = new EventEmitter<void>(); */

  otpForm:FormGroup  = this.formBuilder.group({
    otp: ['', [Validators.required, Validators.maxLength(100)]],
  })

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

    this.store.dispatch(UserActions.validateOtp({otp}))
  }

  cancelOtp() {
    this.store.dispatch(UserActions.userFound())
  }
}
