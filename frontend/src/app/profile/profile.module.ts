import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MdInputModule, MdButtonModule, MdSnackBarModule, MdSelectModule } from '@angular/material';

import { ProfileResolver } from './profile.resolver';
import { AddressControlModule } from '../rs-components/address-control';
import { ProfileService } from './profile.service';
import { ProfileComponent } from './profile.component';
import { OfficesResolver } from './offices.resolver';
import { OfficesService } from './offices.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MdInputModule,
        MdButtonModule,
        MdSnackBarModule,
        MdSelectModule,
        AddressControlModule
    ],
    exports: [],
    declarations: [
        ProfileComponent
    ],
    providers: [
        ProfileService,
        ProfileResolver,
        OfficesService,
        OfficesResolver
    ],
})
export class ProfileModule { }
