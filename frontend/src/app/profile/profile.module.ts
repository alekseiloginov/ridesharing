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
import { NotifyService } from '../rs-services/notify';
import {SetDepartingTimeDialogModule} from '../rs-components/set-departing-time-dialog/set-departing-time-dialog.module';


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
        SetDepartingTimeDialogModule
    ],
    exports: [],
    declarations: [
        ProfileComponent
    ],
    providers: [
        ProfileService,
        ProfileResolver,
        NotifyService
    ],
})
export class ProfileModule { }
