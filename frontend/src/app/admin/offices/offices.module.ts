import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdIconModule, MdButtonModule, MdDialogModule, MdToolbarModule, MdSnackBarModule } from '@angular/material';

import { RTListsModule } from 'right-angled';

import { OfficeDetailModule } from '../address';
import { OfficesComponent } from './offices.component';
import { AddressControlComponent } from "../../rs-components/address-control";

@NgModule({
    imports: [
        CommonModule,
        RTListsModule,
        MdIconModule,
        MdButtonModule,
        MdDialogModule,
        MdSnackBarModule,
        MdToolbarModule,
        OfficeDetailModule
    ],
    exports: [
        OfficesComponent
    ],
    declarations: [
        OfficesComponent
    ],
    entryComponents: [
        AddressControlComponent
    ]
})
export class OfficesModule { }
