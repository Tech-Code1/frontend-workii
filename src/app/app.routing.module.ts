import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { TemplateRootComponent } from './core/layouts/layout-core/template-root/template-root.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateRootComponent,
    children: [
      { path: '', loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule) },
      { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
],
  exports: [
    RouterModule
]
})
export class AppRoutingModule { }
