import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkiiDetailComponent } from './workii-detail.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: WorkiiDetailComponent,
  }
]

@NgModule({
  declarations: [
    WorkiiDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WorkiDetailModule { }
