import { AuthRoutingModule } from './auth-routing.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { InputEmailComponent } from './components/input-email/input-email.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';

@NgModule({
  declarations: [
    LoginComponent,
    //AuthComponent,
    SigninComponent
    //InputEmailComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslateModule,
    RouterModule,
  ]
})
export class AuthModule { }
