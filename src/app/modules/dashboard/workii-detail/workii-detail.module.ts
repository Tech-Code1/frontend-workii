import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkiiDetailComponent } from './workii-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { InfoWorkiiComponent } from './components/info-workii/info-workii.component';
import { StatusWorkiiComponent } from './components/status-workii/status-workii.component';
import { InfoWorkiiWithoutApplyComponent } from './components/info-workii-without-apply/info-workii-without-apply.component';
import { InfoWorkiiOwnerComponent } from './components/info-workii-owner/info-workii-owner.component';

const routes: Routes = [
  {
    path: "",
    component: WorkiiDetailComponent,
  }
]

@NgModule({
  declarations: [
    WorkiiDetailComponent,
    InfoWorkiiComponent,
    StatusWorkiiComponent,
    InfoWorkiiWithoutApplyComponent,
    InfoWorkiiOwnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class WorkiDetailModule { }
