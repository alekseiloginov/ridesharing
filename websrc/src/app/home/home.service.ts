import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {

    constructor(private http: Http) { }

    getHelloWorld(): Observable<string> {
        return this.http.get('api/my/hello').map(res => res.text());
    }
}
