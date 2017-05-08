import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthStateService, User } from './auth-state.service';

@Injectable()
export class AuthenticationService {

    constructor(private http: Http, private authStateService: AuthStateService) { }

    login(loginForm: LoginForm): Observable<boolean> {
        let user = { ...loginForm, name: 'unknown', role: 'unknown', id: 'unknown' };
        this.authStateService.updateCurrentUser(user, loginForm.rememberMe);
        return this.http.post('/api/auth/login', user)
            .map(resp => {
                let resultUser = resp.json() as User;
                if (resultUser) {
                    const userToStore = { ...resultUser, password: loginForm.password };
                    this.authStateService.updateCurrentUser(userToStore, loginForm.rememberMe);
                    return true;
                } else {
                    this.authStateService.updateCurrentUser(null);
                    return false;
                }
            });
    }

    logout(): void {
        this.authStateService.updateCurrentUser(null);
    }
}

export interface LoginForm {
    email: string;
    password: string;
    rememberMe: boolean;
}
