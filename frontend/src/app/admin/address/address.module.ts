import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdInputModule } from '@angular/material';

import { AddressControlModule } from '../../rs-components/address-control/index';
import { AddressComponent } from './address.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MdButtonModule,
        MdInputModule,
        AddressControlModule
    ],
    declarations: [
        AddressComponent
    ],
    entryComponents: [
        AddressComponent
    ]
})
export class OfficeDetailModule { }
