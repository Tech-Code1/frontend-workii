import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LayoutDashboardModule } from 'src/app/core/layouts/layout-dashboard/layout-dashboard.module';

@NgModule({
	declarations: [DashboardComponent],
	imports: [CommonModule, DashboardRoutingModule, LayoutDashboardModule],
	exports: []
})
export class DashboardModule {}
