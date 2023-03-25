import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutDashboardModule } from 'src/app/core/layouts/layout-dashboard/layout-dashboard.module';
import { ClickOutsideDirective } from './clickOutside.directive';


@NgModule({
  declarations: [
    ClickOutsideDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ClickOutsideDirective
  ]
})
export class ShareDirectiveModule { }
