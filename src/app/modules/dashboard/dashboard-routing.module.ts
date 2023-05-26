import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateDashboardComponent } from 'src/app/core/layouts/layout-dashboard/template-dashboard/template-dashboard.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
	{
		path: '',
		component: TemplateDashboardComponent,
		children: [
			{ path: '', component: DashboardComponent },
			{
				path: 'workiis',
				loadChildren: () => import('./workiis/workiis.module').then((m) => m.WorkiisModule)
			},
			{ path: 'messages', loadChildren: () => import('./messages/messages.module').then((m) => m.MessagesModule) },
			{ path: 'progress', loadChildren: () => import('./progress/progress.module').then((m) => m.ProgressModule) },
			{ path: 'settings', loadChildren: () => import('./setting/setting.module').then((m) => m.SettingModule) },
			{
				path: 'workiis/:slug',
				loadChildren: () => import('./workii-detail/workii-detail.module').then((m) => m.WorkiDetailModule)
			},
			{ path: '**', redirectTo: '/dashboard/workiis' }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule {}
