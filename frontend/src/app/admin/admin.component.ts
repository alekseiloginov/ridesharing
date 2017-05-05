import { Component, OnInit } from '@angular/core';

import { NavLink } from '../rs-components/tabs';

@Component({
    selector: 'admin',
    templateUrl: 'admin.component.html'
})

export class AdminComponent implements OnInit {

    navLinks: NavLink[] = [
        { label: 'Offices', link: 'offices' },
        { label: 'Users', link: 'users' },
    ];

    constructor() { }

    ngOnInit() { }
}
