import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdInputModule, MdButtonModule, MdSnackBarModule } from '@angular/material';

import { AddressControlModule } from '../rs-components/address-control';
import { ProfileService } from './profile.service';
import { ProfileComponent } from './profile.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
        MdInputModule,
        MdButtonModule,
        MdSnackBarModule,
        AddressControlModule
    ],
    exports: [],
    declarations: [
        ProfileComponent
    ],
    providers: [
        ProfileService
    ],
})
export class ProfileModule { }
