import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { LandingRoutingModule } from './landing-routing.module';



@NgModule({
  declarations: [
    NavComponent,
    HeaderComponent,
    BodyComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
