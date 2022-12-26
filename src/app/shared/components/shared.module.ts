import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomErrorsComponent } from './customerrors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CustomErrorsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CustomErrorsComponent,
  ]
})

export class SharedModuleComponents {}
