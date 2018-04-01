import { AuthStateService } from '../../auth';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {Address} from "../../admin/address/address";

@Injectable()
export class OfficesService {

    constructor(private http: Http,
        private authStateService: AuthStateService) { }

    getOffices(): Observable<Office[]> {
        return this.http.get('api/addresses/search/findByType?type=OFFICE')
            .map(resp => resp.json()._embedded.addresses);
    }

    remove(office: Office): Observable<Response> {
        return this.http.delete(`api/addresses/${office.id}`)
            .map(resp => resp.json());
    }

    update(office: Office): Observable<Response> {
        return this.http.patch(`api/addresses/${office.id}`, office)
            .map(resp => resp.json());
    }

    getCurrentUserOffice(): Observable<string> {
        const userId = this.authStateService.getUser().id;
        return this.http.get(`api/users/${userId}/office`)
            .map(resp => resp.json().id);
    }

    create(office: Office): Observable<Response> {
        return this.http.post(`api/addresses`, office)
            .map(resp => resp.json());
    }
}

export interface Office {
    id: string;
    address: string;
    latitude: number;
    longitude: number;
    type: string;
}
