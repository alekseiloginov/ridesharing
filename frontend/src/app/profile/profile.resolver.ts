import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Profile, ProfileService } from './profile.service';
import { AddressControlComponent } from "../rs-components/address-control/address-control.component";

@Injectable()
export class ProfileResolver implements Resolve<Profile> {

    constructor(private profileServie: ProfileService, private addressControlComponent: AddressControlComponent) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Profile> {
        return this.profileServie.getProfile();
    }
}
