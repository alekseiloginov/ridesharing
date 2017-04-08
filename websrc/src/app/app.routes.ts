import { Routes } from '@angular/router';

import { HomeComponent } from './home';
import { CompanionsComponent } from './companions';
import { ProfileComponent } from './profile';
import { AdminComponent } from './admin';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'companions', component: CompanionsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'admin', component: AdminComponent },
    { path: '**', component: NoContentComponent },
];
