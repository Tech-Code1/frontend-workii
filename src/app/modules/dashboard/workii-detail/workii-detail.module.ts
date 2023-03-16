import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkiiDetailComponent } from './workii-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { InfoWorkiiComponent } from './components/info-workii/info-workii.component';
import { StatusWorkiiComponent } from './components/status-workii/status-workii.component';

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
    StatusWorkiiComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class WorkiDetailModule { }
