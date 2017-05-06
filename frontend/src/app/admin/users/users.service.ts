import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UsersService {

    constructor(private http: Http) { }

    getUsers(): Observable<User[]> {
        return this.http.get('api/users')
            .map(resp => resp.json()._embedded.users);
    }

    removeUser(user: User): Observable<Response> {
        return this.http.delete(`api/users/${user.id}`)
            .map(resp => resp.json());
    }

    updateUser(user: User): Observable<Response> {
        return this.http.patch(`api/users/${user.id}`, user)
            .map(resp => resp.json());
    }

    createUser(user: User): Observable<Response> {
        return this.http.post(`api/users/`, user)
            .map(resp => resp.json());
    }

}

export interface User {
    id: number;
    name: string;
    email: string;
    active: boolean;
}

export const ROLES = [
    { value: 'ADMIN', label: 'Administrator' },
    { value: 'USER', label: 'User' },
];
