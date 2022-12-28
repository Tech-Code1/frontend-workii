import { AuthRoutingModule } from './auth-routing.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { ModalTutorialWorkiisComponent } from './components/modal-tutorial-workiis/modal-tutorial-workiis.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { Step2Component } from './pages/step2/step2.component';

@NgModule({
  declarations: [
    LoginComponent,
    SigninComponent,
    ModalTutorialWorkiisComponent,
    Step2Component
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslateModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }
