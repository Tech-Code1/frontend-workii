import { RouterModule, Routes, CanActivate } from '@angular/router';

import { NgModule } from '@angular/core';
import { TemplateRootComponent } from './core/layouts/layout-core/template-root/template-root.component';
import { ValdationTokenGuard } from './modules/auth/guards/valdation-token.guard';

const routes: Routes = [
	{
		path: '',
		component: TemplateRootComponent,
		children: [
			{ path: '', loadChildren: () => import('./modules/landing/landing.module').then((m) => m.LandingModule) },
			{ path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule) }
		]
	},
	{
		path: 'dashboard',
		loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
		canActivate: [ValdationTokenGuard],
		canLoad: [ValdationTokenGuard]
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
