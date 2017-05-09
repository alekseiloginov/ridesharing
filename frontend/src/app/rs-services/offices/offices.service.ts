import { AuthStateService } from '../../auth';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class OfficesService {

    constructor(private http: Http,
        private authStateService: AuthStateService) { }

    getOffices(): Observable<Office[]> {
        return this.http.get('api/addresses/search/findByType?type=OFFICE')
            .map(resp => resp.json()._embedded.addresses);
    }

    getCurrentUserOffice(): Observable<string> {
        const userId = this.authStateService.getUser().id;
        return this.http.get(`api/users/${userId}/office`)
            .map(resp => resp.json().id);
    }
}

export interface Office {
    id: string;
    address: string;
}
