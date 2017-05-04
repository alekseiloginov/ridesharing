import { Injectable } from '@angular/core';

@Injectable()
export class AuthStateService {

    private static readonly CUR_USER_KEY = 'currentUser';
    private static readonly SERIAL_VERSION = '1';

    private currentUser: User;

    constructor() {
        let localStorageUser: LocalStorageUser = JSON.parse(localStorage.getItem(AuthStateService.CUR_USER_KEY));
        if (localStorageUser && localStorageUser.serialVersion &&
            localStorageUser.serialVersion === AuthStateService.SERIAL_VERSION) {
            this.currentUser = localStorageUser.user;
        }
    }

    getToken(): string {
        return this.currentUser ? btoa(this.currentUser.email + ':' + this.currentUser.password) + '==' : 'unknown';
    }

    getUser(): User {
        return this.currentUser;
    }

    updateCurrentUser(user: User, rememberMe: boolean = false) {
        this.currentUser = user;
        if (rememberMe && this.currentUser) {
            let localStorageUser: LocalStorageUser = {
                user: this.currentUser,
                serialVersion: AuthStateService.SERIAL_VERSION
            };
            localStorage.setItem(AuthStateService.CUR_USER_KEY, JSON.stringify(localStorageUser));
        } else {
            localStorage.removeItem(AuthStateService.CUR_USER_KEY);
        }
    }

}

export interface User {
    email: string;
    name: string;
    password: string;
}

interface LocalStorageUser {
    user: User;
    serialVersion: string;
}
