import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LOGIN_PATH } from '../app.routes.constants';
import { AuthStateService } from './auth-state.service';

@Injectable()
export class CanActivateRsappRouteGuardService implements CanActivate {

    constructor(private router: Router,
        private authStateService: AuthStateService) { }

    canActivate() {
        if (this.authStateService.getUser()) {
            return true;
        }
        this.router.navigate([LOGIN_PATH]);
        return false;
    }
}
