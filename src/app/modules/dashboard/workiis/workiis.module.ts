import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkiisComponent } from './workiis.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterTargetComponent, FilterCostComponent, FilterStatus, FilterTimeComponent, ModalCreateWorkiiComponent, ModalInfoWorkiiComponent, NotFoundComponent, SkeletonCardsComponent, WorkiisCardsComponent } from './components';
import { TimeFilterPipe, CostFilterPipe, SearchFilterPipe, StatusFilterPipe, TargetFilterPipe } from './pipes';
import { LottieModule } from 'ngx-lottie';
import { LottieSearchComponent } from 'src/app/shared/lottie/lottieSearch.component';

const routes: Routes = [
  {
    path: "",
    component: WorkiisComponent,
  }
]

@NgModule({
  declarations: [
    LottieSearchComponent,
    WorkiisComponent,
    ModalCreateWorkiiComponent,
    WorkiisCardsComponent,
    ModalInfoWorkiiComponent,
    SkeletonCardsComponent,
    TargetFilterPipe,
    TimeFilterPipe,
    CostFilterPipe,
    StatusFilterPipe,
    SearchFilterPipe,
    FilterTargetComponent,
    FilterTimeComponent,
    FilterCostComponent,
    FilterStatus,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    LottieModule
  ],
  exports: [
    LottieSearchComponent,
  ]
})
export class WorkiisModule { }
