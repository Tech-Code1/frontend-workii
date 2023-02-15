import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/validators/validators.service';
import { loginDTO } from '../../DTOs/loginDTO';
import { AuthService } from '../../services/auth.service';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {

  email!: string | undefined;
  images: any = {}

  registerStep2:FormGroup  = this.formBuilder.group({
    avatar: ['', Validators.required],
    nick: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
  }, {validator: this.validatorsService.similarInputs(this.authService.loginPassword, 'password')} as AbstractControlOptions)

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private registerService: RegisterService,
    private router:Router,
    private validatorsService: ValidatorsService
    ) { }

  ngOnInit(): void {
    this.email = this.authService.loginEmail

    this.registerStep2.patchValue(this.registerService.userCreationDTO)
    this.images = this.registerService.previewImages;
  }


  isValid(inputName: string): boolean | undefined | void {
    if (this.registerStep2.get(inputName)?.touched) {

      return this.registerStep2.get(inputName)?.valid
    }
    return true
  }


  onSubmit(){
    if(!this.registerStep2.valid){
      return;
    }

    this.registerService.AddInfoUser(this.registerStep2.value);
    this.router.navigate(['/auth/step3']);
  }

  showImgPreview(event: any, fieldName: string) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      let file = input.files[0];
      this.registerStep2.get(fieldName)?.setValue(file);
      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.images[fieldName] = reader.result as string;
        this.registerService.previewImages = this.images;
      };

      reader.readAsDataURL(file);
    }
  }
}
