import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MdInputModule, MdButtonModule, MdSnackBarModule, MdSelectModule, MdSlideToggleModule
} from '@angular/material';

import { ProfileResolver } from './profile.resolver';
import { AddressControlModule } from '../rs-components/address-control';
import { ProfileService } from './profile.service';
import { ProfileComponent } from './profile.component';
import { AddressControlComponent } from "../rs-components/address-control/address-control.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MdInputModule,
        MdButtonModule,
        MdSnackBarModule,
        MdSelectModule,
        AddressControlModule,
        MdSlideToggleModule
    ],
    exports: [],
    declarations: [
        ProfileComponent
    ],
    providers: [
        ProfileService,
        ProfileResolver,
        AddressControlComponent
    ],
})
export class ProfileModule { }
