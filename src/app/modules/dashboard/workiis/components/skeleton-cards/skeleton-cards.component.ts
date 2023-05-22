import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IWorkii } from 'src/app/core/models/workii.interface';

@Component({
	selector: 'skeleton-cards',
	templateUrl: './skeleton-cards.component.html',
	styleUrls: ['./skeleton-cards.component.scss']
})
export class SkeletonCardsComponent {
	workiis = [
		{
			name: '',
			target: '',
			time: '',
			reward: ''
		},
		{
			name: '',
			target: '',
			time: '',
			reward: ''
		},
		{
			name: '',
			target: '',
			time: '',
			reward: ''
		},
		{
			name: '',
			target: '',
			time: '',
			reward: ''
		},
		{
			name: '',
			target: '',
			time: '',
			reward: ''
		},
		{
			name: '',
			target: '',
			time: '',
			reward: ''
		},
		{
			name: '',
			target: '',
			time: '',
			reward: ''
		},
		{
			name: '',
			target: '',
			time: '',
			reward: ''
		},
		{
			name: '',
			target: '',
			time: '',
			reward: ''
		},
		{
			name: '',
			target: '',
			time: '',
			reward: ''
		},
		{
			name: '',
			target: '',
			time: '',
			reward: ''
		},
		{
			name: '',
			target: '',
			time: '',
			reward: ''
		},
		{
			name: '',
			target: '',
			time: '',
			reward: ''
		},
		{
			name: '',
			target: '',
			time: '',
			reward: ''
		},
		{
			name: '',
			target: '',
			time: '',
			reward: ''
		}
	];
}
