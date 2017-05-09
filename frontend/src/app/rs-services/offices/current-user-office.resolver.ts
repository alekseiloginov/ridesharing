import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { OfficesService } from './offices.service';

@Injectable()
export class CurrentUserOfficeResolver implements Resolve<string> {

    constructor(private officesService: OfficesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
        return this.officesService.getCurrentUserOffice();
    }
}
