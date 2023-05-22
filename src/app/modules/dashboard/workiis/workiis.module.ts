import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LottieModule } from 'ngx-lottie';
import { PaginationModule } from 'src/app/shared/components/pagination/pagination.module';
import { LottieSearchComponent } from 'src/app/shared/lottie/lottieSearch.component';
import {
	FilterCostComponent,
	FilterStatusComponent,
	FilterTargetComponent,
	FilterTimeComponent,
	ModalCreateWorkiiComponent,
	ModalInfoWorkiiComponent,
	NotFoundComponent,
	SkeletonCardsComponent,
	WorkiisCardsComponent
} from './components';
import { CustomPaginatorComponent } from './components/custom-paginator/custom-paginator.component';
import { WorkiisContentComponent } from './components/workiis-content/workiis-content.component';
import { CostFilterPipe, SearchFilterPipe, StatusFilterPipe, TargetFilterPipe, TimeFilterPipe } from './pipes';
import { WorkiisComponent } from './workiis.component';

const routes: Routes = [
	{
		path: '',
		component: WorkiisComponent
	}
];

@NgModule({
	declarations: [
		LottieSearchComponent,
		WorkiisContentComponent,
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
		FilterStatusComponent,
		NotFoundComponent,
		CustomPaginatorComponent
	],
	imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, LottieModule, PaginationModule],
	exports: [LottieSearchComponent]
})
export class WorkiisModule {}
