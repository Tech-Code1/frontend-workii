import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { AuthModuleRoutingModule } from './auth-module-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NavComponent } from './components/nav/nav.component';
import { SelectLangComponent } from './components/select-lang/select-lang.component';
import { BtnLoginComponent } from './components/btn-login/btn-login.component';
import { BtnSupportComponent } from './components/btn-support/btn-support.component';
import { TemplateAuthComponent } from './template-auth/template-auth.component';
import { ClickOutsideDirective } from 'src/app/shared/directives/clickOutside.directive';


@NgModule({
  declarations: [
    SelectLangComponent,
    BtnLoginComponent,
    BtnSupportComponent,
    ClickOutsideDirective,
    NavComponent,
    TemplateAuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthModuleRoutingModule,
    TranslateModule,
  ],
})
export class AuthModuleModule { }
