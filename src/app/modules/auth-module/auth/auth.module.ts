import { AuthRoutingModule } from './auth-routing.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { InputEmailComponent } from './pages/components/input-email/input-email.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LoginComponent,
    InputEmailComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslateModule,
  ]
})
export class AuthModule { }
