import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


import { NavComponent } from './components/nav/nav.component';
import { TemplateAuthComponent } from './template-auth/template-auth.component';


const routes: Routes = [
  {
    path: '',
    component: TemplateAuthComponent,
    children: [
      { path: '', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
      { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthModuleRoutingModule { }
