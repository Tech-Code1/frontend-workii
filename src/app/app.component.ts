import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { supportLanguages } from './shared/utils/constLanguages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'workii';

  constructor(
		private translateService: TranslateService
	) {
		this.translateService.addLangs(supportLanguages);
		this.translateService.setDefaultLang('en');
		this.translateService.use('en');

		/* const browserlang = this.translateService.getBrowserLang();
	 this.translateService.use(browserlang); */
	}
}
