import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateDashboardComponent } from './template-dashboard/template-dashboard.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { LayoutCoreModule } from '../layout-core/layout-core.module';
import { HeaderDashboard } from './components/header-dashboard/header-dashboard.component';
import { ClickOutsideDirective } from 'src/app/shared/directives/clickOutside.directive';
import { ShareDirectiveModule } from 'src/app/shared/directives/shareDirectives.module';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { NotificationsComponent } from './components/notifications/notifications.component';

@NgModule({
	declarations: [TemplateDashboardComponent, MenuComponent, HeaderDashboard, NotificationsComponent],
	imports: [CommonModule, RouterModule, LayoutCoreModule, ShareDirectiveModule, SharedModule],
	exports: [TemplateDashboardComponent]
})
export class LayoutDashboardModule {}
