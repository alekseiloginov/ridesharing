import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdInputModule } from '@angular/material';

import { AddressControlModule } from '../../../rs-components/address-control';
import { OfficeDetailComponent } from './office-detail.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MdButtonModule,
        MdInputModule,
        AddressControlModule
    ],
    declarations: [
        OfficeDetailComponent
    ],
    entryComponents: [
        OfficeDetailComponent
    ]
})
export class OfficeDetailModule { }
