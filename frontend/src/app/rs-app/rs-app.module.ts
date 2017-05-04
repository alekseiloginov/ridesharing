import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdButtonModule, MdMenuModule } from '@angular/material';

import { RsAppComponent } from './rs-app.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MdButtonModule,
        MdMenuModule
    ],
    declarations: [
        RsAppComponent
    ]
})
export class RsAppModule { }
