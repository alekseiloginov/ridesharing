import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    NgModule,
    ApplicationRef
} from '@angular/core';
import {
    removeNgStyles,
    createNewHosts,
    createInputTransfer
} from '@angularclass/hmr';
import {
    RouterModule,
    PreloadAllModules
} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RTModule } from 'right-angled';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { RsAppModule } from './rs-app';
import { HomeComponent } from './home';
import { HomeService } from './home/home.service';
import { CompanionsModule } from './companions';
import { ProfileModule } from './profile';
import { AdminModule } from './admin';
import { NoContentComponent } from './no-content';
import { AuthenticationService, CanActivateRsappRouteGuardService } from './auth';
import { LoginModule } from './login';
import { AgmCoreModule } from '@agm/core';
import { OfficesResolver, OfficesService, CurrentUserOfficeResolver } from './rs-services/offices';

import '../styles/styles.scss';
import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [
    CurrentUserOfficeResolver,
    AppState,
    HomeService,
    AuthenticationService,
    CanActivateRsappRouteGuardService,
    OfficesService,
    OfficesResolver
];

type StoreType = {
    state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        HomeComponent,
        NoContentComponent
    ],
    imports: [ // import Angular's modules
        BrowserAnimationsModule,
        BrowserModule,
        RsAppModule,
        FormsModule,
        HttpModule,
        RTModule,
        LoginModule,
        CompanionsModule,
        ProfileModule,
        AdminModule,
        RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules }),
        AgmCoreModule.forRoot({ apiKey: 'AIzaSyDJTnsuCu4wGQ8TVAsUQLVwrdHREkriQn8' })
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,
        APP_PROVIDERS
    ]
})
export class AppModule {

    constructor(
        public appRef: ApplicationRef,
        public appState: AppState
    ) { }

    public hmrOnInit(store: StoreType) {
        if (!store || !store.state) {
            return;
        }
        console.log('HMR store', JSON.stringify(store, null, 2));
        // set state
        this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            let restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }

        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }

    public hmrOnDestroy(store: StoreType) {
        const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
        // save state
        const state = this.appState._state;
        store.state = state;
        // recreate root elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues = createInputTransfer();
        // remove styles
        removeNgStyles();
    }

    public hmrAfterDestroy(store: StoreType) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }

}
