import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

    @Input()
    navLinks: NavLink[];

    constructor() { }

    ngOnInit() { }
}

export interface NavLink {
    label: string;
    link: string;
    requiredRole?: string;
}
