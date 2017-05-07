import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthStateService } from '../auth';

@Injectable()
export class CanActivateAdminRouteGuard implements CanActivate {

    constructor(private authStateService: AuthStateService) { }

    canActivate() {
        return this.authStateService.userHasRole('ADMIN');
    }

}
