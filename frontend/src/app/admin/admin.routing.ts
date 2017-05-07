import { Routes, RouterModule } from '@angular/router';

import { CanActivateAdminRouteGuard } from './can-activate-admin-route.guard';
import { AdminComponent } from './admin.component';
import { OfficesComponent } from './offices';
import { UsersComponent } from './users';

export const ADMIN_ROUTES: Routes = [
    {
        path: 'admin', component: AdminComponent, canActivate: [CanActivateAdminRouteGuard], children: [
            { path: 'offices', component: OfficesComponent },
            { path: 'users', component: UsersComponent },
        ]
    },
];

export const AdminRoutes = RouterModule.forChild(ADMIN_ROUTES);
