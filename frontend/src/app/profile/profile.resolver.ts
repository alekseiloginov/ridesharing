import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Profile, ProfileService } from './profile.service';

@Injectable()
export class ProfileResolver implements Resolve<Profile> {

    constructor(private profileServie: ProfileService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Profile> {
        return this.profileServie.getProfile();
    }
}
