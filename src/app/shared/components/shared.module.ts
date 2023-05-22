import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomErrorsComponent } from './customerrors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DarkModeComponent } from './darkMode.component';

@NgModule({
	declarations: [CustomErrorsComponent, DarkModeComponent],
	imports: [CommonModule, ReactiveFormsModule, FormsModule],
	exports: [CustomErrorsComponent, DarkModeComponent]
})
export class SharedModule {}
