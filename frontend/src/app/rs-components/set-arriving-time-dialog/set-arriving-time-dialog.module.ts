import { NgModule, Component } from '@angular/core';
import { MdButtonModule } from '@angular/material';

import 'hammerjs';

import { SetArrivingTimeDialogComponent } from './set-arriving-time-dialog.component';

@NgModule({
    imports: [
        MdButtonModule
    ],
    exports: [],
    declarations: [
        SetArrivingTimeDialogComponent
    ],
    providers: [],
    entryComponents: [
        SetArrivingTimeDialogComponent
    ]
})
export class SetArrivingTimeDialogModule { }
