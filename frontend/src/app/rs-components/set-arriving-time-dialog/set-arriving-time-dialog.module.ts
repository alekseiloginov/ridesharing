import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdSliderModule, MdInputModule } from '@angular/material';
import 'hammerjs';

import { SetArrivingTimeDialogComponent } from './set-arriving-time-dialog.component';
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        MdButtonModule,
        MdSliderModule,
        MdInputModule,
        FormsModule,
        CommonModule
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
