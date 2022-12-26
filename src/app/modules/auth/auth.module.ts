import { AuthRoutingModule } from './auth-routing.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { ModalTutorialWorkiisComponent } from './components/modal-tutorial-workiis/modal-tutorial-workiis.component';

@NgModule({
  declarations: [
    LoginComponent,
    SigninComponent,
    ModalTutorialWorkiisComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslateModule,
    RouterModule,
  ]
})
export class AuthModule { }
