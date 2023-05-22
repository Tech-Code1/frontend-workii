import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { LandingRoutingModule } from './landing-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [HeaderComponent, BodyComponent, HomeComponent],
	imports: [CommonModule, RouterModule, LandingRoutingModule, TranslateModule]
})
export class LandingModule {}
