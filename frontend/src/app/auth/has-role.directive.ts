import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthStateService } from './auth-state.service';

@Directive({
    selector: '[hasRole]'
})
export class HasRoleDirective implements OnInit {

    @Input()
    hasRole: string;

    constructor(private viewContainerRef: ViewContainerRef,
        private template: TemplateRef<any>,
        private authStateService: AuthStateService) { }

    ngOnInit() {
        this.checkRoles();
    }

    checkRoles() {
        if (this.authStateService.userHasRole(this.hasRole)) {
            this.viewContainerRef.createEmbeddedView(this.template);
        } else {
            this.viewContainerRef.clear();
        }
    }

}
