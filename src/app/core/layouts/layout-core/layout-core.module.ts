import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ClickOutsideDirective } from 'src/app/shared/directives/clickOutside.directive';
import { BtnLoginComponent } from './components/btn-login/btn-login.component';
import { BtnSupportComponent } from './components/btn-support/btn-support.component';
import { NavComponent } from './components/nav/nav.component';
import { SelectLangComponent } from './components/select-lang/select-lang.component';
import { TemplateRootComponent } from './template-root/template-root.component';

@NgModule({
  declarations: [
    ClickOutsideDirective,
    SelectLangComponent,
    BtnLoginComponent,
    BtnSupportComponent,
    NavComponent,
    TemplateRootComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
  ],
  exports: [
    TemplateRootComponent
  ]
})
export class LayoutCoreModule { }
