import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateDashboardComponent } from './template-dashboard/template-dashboard.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { LayoutCoreModule } from '../layout-core/layout-core.module';
import { HeaderDashboard } from './components/header-dashboard/header-dashboard.component';
import { ClickOutsideDirective } from 'src/app/shared/directives/clickOutside.directive';
import { ShareDirectiveModule } from 'src/app/shared/directives/shareDirectives.module';



@NgModule({
  declarations: [
    TemplateDashboardComponent,
    MenuComponent,
    HeaderDashboard,

  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutCoreModule,
    ShareDirectiveModule
  ],
  exports: [
    TemplateDashboardComponent,
  ]
})
export class LayoutDashboardModule { }
