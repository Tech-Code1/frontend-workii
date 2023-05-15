import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { supportLanguages } from './shared/utils/constLanguages';
import { IAppState } from './core/state/app.state';
import { UserActions } from './core/state/actions/user.actions';
import { AuthService } from './modules/auth/services/auth.service';
import { selectOneUser } from './core/state/selectors/user.selectors';
import { UserService } from './modules/auth/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'workii';

  private translateService = inject(TranslateService)
  private store = inject(Store<IAppState>)
  private authService = inject(AuthService)
  private userService = inject(UserService)

  userCurrentId: string = this.userService.getCurrentUser();

  constructor() {
		this.translateService.addLangs(supportLanguages);
		this.translateService.setDefaultLang('en');
		this.translateService.use('en');

		/* const browserlang = this.translateService.getBrowserLang();
	 this.translateService.use(browserlang); */
	}


  ngOnInit() {
    const token = localStorage.getItem('authToken');


    if(token) {
      this.store.dispatch(UserActions.validateToken());

      this.store.dispatch(UserActions.getUser(this.userCurrentId))
    }

  }


}
