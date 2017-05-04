import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RsAppComponent } from './rs-app.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        RsAppComponent
    ]
})
export class RsAppModule { }
