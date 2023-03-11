import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LayoutDashboardModule } from 'src/app/core/layouts/layout-dashboard/layout-dashboard.module';
import { EffectsModule } from '@ngrx/effects';
import { WorkiiEffects } from './workiis/state/effects/workiis.effects';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutDashboardModule,
    EffectsModule.forFeature([WorkiiEffects]),
  ],
  exports: []
})
export class DashboardModule { }
