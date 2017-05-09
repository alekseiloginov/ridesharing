import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Office, OfficesService } from './offices.service';

@Injectable()
export class OfficesResolver implements Resolve<Office[]> {

    constructor(private officesService: OfficesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Office[]> {
        return this.officesService.getOffices();
    }
}
