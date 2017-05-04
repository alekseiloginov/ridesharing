import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, AuthStateService, User } from '../auth';
import { LOGIN_PATH } from '../app.routes.constants';

@Component({
    selector: 'rs-app',
    templateUrl: './rs-app.component.html',
    styleUrls: ['./rs-app.component.css']
})
export class RsAppComponent implements OnInit {

    user: User;

    constructor(private authenticationService: AuthenticationService, private authStateService: AuthStateService,
        private router: Router) { }

    ngOnInit() {
        this.user = this.authStateService.getUser();
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate([LOGIN_PATH]);
    }

}
