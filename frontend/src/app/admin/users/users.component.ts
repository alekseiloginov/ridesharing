import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { User, UsersService } from './users.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    constructor(private usersService: UsersService) { }

    ngOnInit() { }

    getUsers = (): Observable<User[]> => {
        return this.usersService.getUsers();
    }
}
