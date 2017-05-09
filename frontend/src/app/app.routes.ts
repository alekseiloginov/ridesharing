import { Routes } from '@angular/router';

import { RsAppComponent } from './rs-app';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { CompanionsComponent } from './companions';
import { ProfileComponent, ProfileResolver } from './profile';
import { ADMIN_ROUTES } from './admin';
import { NoContentComponent } from './no-content';
import { CanActivateRsappRouteGuardService } from './auth';
import { OfficesResolver, CurrentUserOfficeResolver } from './rs-services/offices';

import { LOGIN_PATH } from './app.routes.constants';

export const ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'rsapp' },
    { path: LOGIN_PATH, component: LoginComponent },
    {
        path: 'rsapp', component: RsAppComponent, canActivate: [CanActivateRsappRouteGuardService], children: [
            { path: '', pathMatch: 'full', redirectTo: 'home' },
            { path: 'home', component: HomeComponent },
            {
                path: 'companions',
                component: CompanionsComponent,
                resolve: {
                    currentUserOffice: CurrentUserOfficeResolver,
                    offices: OfficesResolver
                }
            },
            {
                path: 'profile',
                component: ProfileComponent,
                resolve: {
                    profile: ProfileResolver,
                    offices: OfficesResolver
                }
            },
            ...ADMIN_ROUTES,
            { path: '**', component: NoContentComponent },
        ]
    },
];
