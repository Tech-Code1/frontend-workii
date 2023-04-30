import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkiisComponent } from './workiis.component';
import { RouterModule, Routes } from '@angular/router';
import { ModalCreateWorkiiComponent } from './components/modal-create-workii/modal-create-workii.component';
import { WorkiisCardsComponent } from './components/workiis-cards/workiis-cards.component';
import { ModalInfoWorkiiComponent } from './components/modal-info-workii/modal-info-workii.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SkeletonCardsComponent } from './components/skeleton-cards/skeleton-cards.component';
import { TargetFilterPipe } from './pipes/target-filter.pipe';
import { ButtonFilterTargetComponent } from './components/button-filter-target/button-filter-target.component';
import { InputFilterTargetComponent } from './components/input-filter-target/input-filter-target.component';
import { InputFilterTimeComponent } from './components/input-filter-time/input-filter-time.component';
import { ButtonFilterTimeComponent } from './components/button-filter-time/button-filter-time.component';
import { TimeFilterPipe } from './pipes/time-filter.pipe';
import { ButtonFilterCostComponent } from './components/button-filter-cost/button-filter-cost.component';
import { CostFilterPipe } from './pipes/cost-filter.pipe';
import { ButtonFilterOwnershipComponent } from './components/button-filter-ownership/button-filter-ownership.component';
import { StatusFilterPipe } from './pipes/status-filter.pipe';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { NotFoundComponent } from './components/not-found/not-found.component';
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
    ButtonFilterTargetComponent,
    InputFilterTargetComponent,
    InputFilterTimeComponent,
    ButtonFilterTimeComponent,
    ButtonFilterCostComponent,
    ButtonFilterOwnershipComponent,
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
