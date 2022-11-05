import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { LandingRoutingModule } from './landing-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ClickOutsideDirective } from '../shared/directives/clickOutside.directive';
import { SelectLangComponent } from './components/nav/components/select-lang/select-lang.component';
import { BtnLoginComponent } from './components/nav/components/btn-login/btn-login.component';
import { BtnSupportComponent } from './components/nav/components/btn-support/btn-support.component';



@NgModule({
  declarations: [
    NavComponent,
    HeaderComponent,
    BodyComponent,
    HomeComponent,
    ClickOutsideDirective,
    SelectLangComponent,
    BtnLoginComponent,
    BtnSupportComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LandingRoutingModule,
    TranslateModule,
  ]
})
export class LandingModule { }
