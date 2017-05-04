import { Routes } from '@angular/router';

import { RsAppComponent } from './rs-app';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { CompanionsComponent } from './companions';
import { ProfileComponent } from './profile';
import { AdminComponent } from './admin';
import { NoContentComponent } from './no-content';

import { LOGIN_PATH } from './app.routes.constants';
import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'rsapp' },
    { path: LOGIN_PATH, component: LoginComponent },
    {
        path: 'rsapp', component: RsAppComponent, children: [
            { path: '', component: HomeComponent },
            { path: 'companions', component: CompanionsComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'admin', component: AdminComponent },
            { path: '**', component: NoContentComponent },
        ]
    },
];
