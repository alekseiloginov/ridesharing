import { Component, OnInit } from '@angular/core';

import { HomeService } from './home.service';

@Component({
    selector: 'home',
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    constructor(private homeService: HomeService) { }

    public ngOnInit() {
        console.log('hello `Home` component');
        this.homeService.getHelloWorld().subscribe(
            res => console.log(res)
        );
    }
}
