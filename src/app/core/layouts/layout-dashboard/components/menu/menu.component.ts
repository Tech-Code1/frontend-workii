import { Component, OnInit, inject } from '@angular/core';
import { ToggleLayoutService } from 'src/app/modules/dashboard/workiis/service/toggleLayoutService.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	public toggleLayoutService = inject(ToggleLayoutService);

	toggleLayout$!: Observable<boolean>;
	titleLang: string = 'Language';

	ngOnInit(): void {
		this.toggleLayout$ = this.toggleLayoutService.toggleLayout$;
	}

	toggleLayoutHidden(): void {
		this.toggleLayoutService.toggleLayout();
	}
}
