import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { LayoutCoreModule } from './core/layouts/layout-core/layout-core.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

// NgRx
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import player, { LottiePlayer } from 'lottie-web';
import { localStorageSync } from 'ngrx-store-localstorage';
import { LottieModule as NgxLottieModule } from 'ngx-lottie';
import { AppInterceptor } from './core/interceptors/app.interceptor';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ROOT_REDUCERS } from './core/state/app.state';
import { UserEffects } from './core/state/effects/user.effects';
import { WorkiiEffects } from './modules/dashboard/workiis/state/effects/workiis.effects';

export function playerFactory(): LottiePlayer {
	return player;
}

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
	return localStorageSync({ keys: ['token', 'access_token_expiration', 'code_verifier', 'theme'], rehydrate: true })(
		reducer
	);
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		LayoutCoreModule,
		RouterModule,
		AppRoutingModule,
		DashboardModule,
		HttpClientModule,
		StoreModule.forRoot(ROOT_REDUCERS, {
			metaReducers: [localStorageSyncReducer],
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
				strictStateSerializability: true,
				strictActionSerializability: true
			}
		}),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
		EffectsModule.forRoot([WorkiiEffects, UserEffects]),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient]
			}
		}),
		[NgxLottieModule.forRoot({ player: playerFactory })]
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
