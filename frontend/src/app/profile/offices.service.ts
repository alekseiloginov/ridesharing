import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class OfficesService {

    constructor(private http: Http) { }

    getOffices(): Observable<Office[]> {
        return this.http.get('api/addresses/search/findByType?type=OFFICE')
            .map(resp => resp.json()._embedded.addresses);
    }
}

export interface Office {
    id: string;
    address: string;
}
