import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { LoggedGuard } from './core/guards/logged.guard';
import { UnloggeddGuard } from './core/guards/unloggued.guard';
import { TemplateRootComponent } from './core/layouts/layout-core/template-root/template-root.component';

const routes: Routes = [
	{
		path: '',
		component: TemplateRootComponent,
		children: [
			{
				path: '',
				loadChildren: () => import('./modules/landing/landing.module').then((m) => m.LandingModule)
			},
			{
				path: 'auth',
				loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
				canActivate: [UnloggeddGuard]
			}
		]
	},
	{
		path: 'dashboard',
		loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
		canActivate: [LoggedGuard]
	},
	{
		path: '**',
		redirectTo: '/'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
