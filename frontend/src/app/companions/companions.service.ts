import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Address } from '../rs-components/address-control';

@Injectable()
export class CompanionsService {

    constructor(private http: Http) { }

    search(filter: Filter): Observable<PossibleComanion[]> {
        return this.http.get(
            `api/users/search/findByDistanceFromHomeAndOffice?` +
            `distanceKm=${filter.distanceKm}&officeId=${filter.officeId}&projection=profile`)
            .map(resp => resp.json()._embedded.users);
    }
}

export interface Filter {
    officeId: string;
    distanceKm: number;
}

export interface PossibleComanion {
    id: string;
    name: string;
    home: Address;
}
