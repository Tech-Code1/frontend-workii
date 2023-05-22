import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { Step2Component } from './pages/step2/step2.component';
import { Step3Component } from './pages/step3/step3.component';

const routes: Routes = [
	{
		path: '',
		component: LoginComponent
	},
	{ path: 'step2', component: Step2Component },
	{ path: 'step3', component: Step3Component }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule {}
