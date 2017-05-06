import { Injectable } from '@angular/core';
import {
    Http, Request, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers, RequestMethod
} from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthStateService } from './auth-state.service';

@Injectable()
export class HttpInterceptor extends Http {

    constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions,
        private _router: Router,
        private authStateService: AuthStateService) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, defaultOpts?: RequestOptionsArgs): Observable<Response> {
        const options = this.getRequestOptionArgs(defaultOpts.method, defaultOpts);
        return this.intercept(super.request(url, options));
    }

    get(url: string, defaultOpts?: RequestOptionsArgs): Observable<Response> {
        const options = this.getRequestOptionArgs(RequestMethod.Get, defaultOpts);
        return this.intercept(super.request(url, options));
    }

    post(url: string, body: string, defaultOpts?: RequestOptionsArgs): Observable<Response> {
        const options = this.getRequestOptionArgs(RequestMethod.Post, defaultOpts, body);
        return this.intercept(super.request(url, options));
    }

    patch(url: string, body: string, defaultOpts?: RequestOptionsArgs): Observable<Response> {
        const options = this.getRequestOptionArgs(RequestMethod.Patch, defaultOpts, body);
        return this.intercept(super.request(url, options));
    }

    put(url: string, body: string, defaultOpts?: RequestOptionsArgs): Observable<Response> {
        const options = this.getRequestOptionArgs(RequestMethod.Put, defaultOpts, body);
        return this.intercept(super.request(url, options));
    }

    delete(url: string, defaultOpts?: RequestOptionsArgs): Observable<Response> {
        const options = this.getRequestOptionArgs(RequestMethod.Delete, defaultOpts);
        return this.intercept(super.request(url, options));
    }

    getRequestOptionArgs(
        method: string | RequestMethod,
        defaultOpts?: RequestOptionsArgs,
        body?: string): RequestOptionsArgs {
        const options = new RequestOptions({
            method,
            headers: new Headers(),
            body
        }).merge(defaultOpts);
        if (method === RequestMethod.Patch || method === RequestMethod.Put) {
            options.headers.append('Content-Type', 'application/json');
        }
        // options.headers.append('X-Requested-With', 'XMLHttpRequest');
        options.headers.append('Authorization', 'Basic ' + this.authStateService.getToken());
        return options;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            if (err.status === 401 && location.pathname !== '/login') {
                // 401 status indicates that the user is not authenticated
                location.href = '/login?redirectTo=' + location.pathname;
                return Observable.throw(err);
            } else if (err.status === 403) {
                // 403 status indicates that the user does not have permission to perform that action.
                // Generally, try to block the user from attempting to perform the action in the first place.
                console.error({ msg: 'User is not authorized to perform that action.' });
                return Observable.throw(err);
            } else {
                return Observable.throw(err);
            }
        });
    }
}
