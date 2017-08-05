import {AuthStateService} from '../../auth';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class NotifyService {

constructor(private http: Http,
        private authStateService: AuthStateService) { }

    notifyAboutDeparting(time: string): Observable<Response> {
        return this.http.post('api/notify?time=' + time, "")
            .map(resp => resp.json());
    }
}
