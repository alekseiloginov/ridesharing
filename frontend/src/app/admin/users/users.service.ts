import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UsersService {

    constructor(private http: Http) { }

    getUsers(): Observable<User[]> {
        // return Observable.of([
        //     { id: 1, name: 'Fake User 1', email: 'fake1@email.com', active: true },
        //     { id: 2, name: 'Fake User 2', email: 'fake2@email.com', active: false },
        //     { id: 3, name: 'Fake User 3', email: 'fake3@email.com', active: true },
        // ]);
        return this.http.get('api/users')
            .map(resp => resp.json()._embedded.users);
    }

    removeUser(user: User) {
        // TODO: ...
        console.log('TODO: remove user on backend: ', user);
    }

    updateUser(user: User) {
        // TODO: ...
        console.log('TODO: update user on backend: ', user);
    }

    createUser(user: User) {
        // TODO: ...
        console.log('TODO: create user on backend: ', user);
    }

}

export interface User {
    id: number;
    name: string;
    email: string;
    active: boolean;
}
