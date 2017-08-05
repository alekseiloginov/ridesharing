import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdSliderModule, MdInputModule } from '@angular/material';
import 'hammerjs';

import { SetDepartingTimeDialogComponent } from './set-departing-time-dialog.component';
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
        SetDepartingTimeDialogComponent
    ],
    providers: [],
    entryComponents: [
        SetDepartingTimeDialogComponent
    ]
})
export class SetDepartingTimeDialogModule { }
