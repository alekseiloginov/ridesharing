import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    public ngOnInit() {
        console.log('hello `Home` component');
    }
}
