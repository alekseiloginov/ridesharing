import { Component, OnInit } from '@angular/core';

import { NavLink } from '../rs-components/tabs';

@Component({
    selector: 'admin',
    templateUrl: 'admin.component.html'
})

export class AdminComponent implements OnInit {

    navLinks: NavLink[] = [
        { label: 'Offices', link: 'offices', requiredRole: 'ADMIN' },
        { label: 'Users', link: 'users', requiredRole: 'ADMIN' },
    ];

    constructor() { }

    ngOnInit() { }
}
