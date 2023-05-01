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
import { FilterTargetComponent } from './components/filter-target/filter-target.component';
import { FilterTimeComponent } from './components/filter-time/filter-time.component';
import { TimeFilterPipe } from './pipes/time-filter.pipe';
import { FilterCostComponent } from './components/filter-cost/filter-cost.component';
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
    FilterTargetComponent,
    FilterTimeComponent,
    FilterCostComponent,
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
