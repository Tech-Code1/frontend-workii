import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SettingComponent
	}
];

@NgModule({
	declarations: [SettingComponent],
	imports: [CommonModule, RouterModule.forChild(routes)]
})
export class SettingModule {}
