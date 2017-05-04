import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService, AuthStateService, LoginForm } from '../auth';

@Component({
    selector: 'rs-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    redirectTo: string = '/';

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private authStateService: AuthStateService,
        fb: FormBuilder) {
        this.loginForm = fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: [false]
        });
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.redirectTo = params['redirectTo'] ? params['redirectTo'] : '/';
            console.log('will redirect to url after successful authentication: ', this.redirectTo);
        });
        let user = this.authStateService.getUser();
        if (user) {
            this.loginForm.patchValue(user);
        }
    }

    login() {
        let credentials = this.loginForm.value as LoginForm;
        this.authenticationService.login(credentials).subscribe(
            success => {
                if (success) {
                    this.router.navigateByUrl(this.redirectTo);
                }
            }
        );
    }

}
