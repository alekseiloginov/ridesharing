import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MdInputModule, MdButtonModule, MdSnackBarModule, MdSelectModule, MdSlideToggleModule, MdDialogModule
} from '@angular/material';

import { ProfileResolver } from './profile.resolver';
import { AddressControlModule } from '../rs-components/address-control';
import { ProfileService } from './profile.service';
import { ProfileComponent } from './profile.component';
import {SetArrivingTimeDialogModule} from '../rs-components/set-arriving-time-dialog/set-arriving-time-dialog.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MdInputModule,
        MdButtonModule,
        MdDialogModule,
        MdSnackBarModule,
        MdSelectModule,
        AddressControlModule,
        MdSlideToggleModule,
        SetArrivingTimeDialogModule
    ],
    exports: [],
    declarations: [
        ProfileComponent
    ],
    providers: [
        ProfileService,
        ProfileResolver
    ],
})
export class ProfileModule { }
