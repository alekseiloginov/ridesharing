import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdButtonModule, MdMenuModule, MdToolbarModule } from '@angular/material';

import { TabsModule } from '../rs-components/tabs';
import { RsAppComponent } from './rs-app.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TabsModule,
        MdButtonModule,
        MdMenuModule,
        MdToolbarModule
    ],
    declarations: [
        RsAppComponent
    ]
})
export class RsAppModule { }
