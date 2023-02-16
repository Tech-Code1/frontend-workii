import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkiisComponent } from './workiis.component';
import { RouterModule, Routes } from '@angular/router';
import { ModalCreateWorkiiComponent } from './components/modal-create-workii/modal-create-workii.component';

const routes: Routes = [
  {
    path: "",
    component: WorkiisComponent,
  }
]

@NgModule({
  declarations: [
    WorkiisComponent,
    ModalCreateWorkiiComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WorkiisModule { }
