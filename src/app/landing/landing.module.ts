import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { LandingRoutingModule } from './landing-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MobileMenuComponent } from './components/nav/components/mobile-menu/mobile-menu.component';
import { ClickOutsideDirective } from '../shared/directives/clickOutside.directive';



@NgModule({
  declarations: [
    NavComponent,
    HeaderComponent,
    BodyComponent,
    HomeComponent,
    MobileMenuComponent,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    LandingRoutingModule,
    TranslateModule
  ]
})
export class LandingModule { }
