import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkiisComponent } from './workiis.component';
import { RouterModule, Routes } from '@angular/router';
import { ModalCreateWorkiiComponent } from './components/modal-create-workii/modal-create-workii.component';
import { WorkiisCardsComponent } from './components/workiis-cards/workiis-cards.component';
import { ModalInfoWorkiiComponent } from './components/modal-info-workii/modal-info-workii.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: "",
    component: WorkiisComponent,
  }
]

@NgModule({
  declarations: [
    WorkiisComponent,
    ModalCreateWorkiiComponent,
    WorkiisCardsComponent,
    ModalInfoWorkiiComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class WorkiisModule { }
