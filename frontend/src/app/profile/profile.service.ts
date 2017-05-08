import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AuthStateService } from '../auth';

@Injectable()
export class ProfileService {

    constructor(private http: Http,
        private authStateService: AuthStateService) { }

    getProfile(): Observable<Profile> {
        return this.http.get('api/users/' + this.authStateService.getUser().id + '?projection=profile')
            .map(resp => resp.json());
    }

    updatePrifle(profile: Profile): Observable<Response> {
        return this.http.patch('api/users/' + this.authStateService.getUser().id, profile)
            .map(resp => resp.json());
    }
}

export interface Profile {
    name: string;
    phone: string;
}
