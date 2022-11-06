import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [

    { path: '', loadChildren: () => import('./modules/auth-module/auth-module.module').then(m => m.AuthModuleModule) },
    { path: '**', redirectTo: '/' }

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
