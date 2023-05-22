import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { ShareDirectiveModule } from 'src/app/shared/directives/shareDirectives.module';
import { LayoutCoreModule } from '../layout-core/layout-core.module';
import { HeaderDashboardComponent } from './components/header-dashboard/header-dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { TemplateDashboardComponent } from './template-dashboard/template-dashboard.component';

@NgModule({
	declarations: [TemplateDashboardComponent, MenuComponent, HeaderDashboardComponent, NotificationsComponent],
	imports: [CommonModule, RouterModule, LayoutCoreModule, ShareDirectiveModule, SharedModule],
	exports: [TemplateDashboardComponent]
})
export class LayoutDashboardModule {}
