import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'template-dashboard',
	templateUrl: './template-dashboard.component.html',
	styleUrls: ['./template-dashboard.component.scss']
})
export class TemplateDashboardComponent implements OnInit {
	constructor(public router: Router) {}

	ngOnInit(): void {}
}
