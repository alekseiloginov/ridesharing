import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MdInputModule } from '@angular/material';

import { AgmCoreModule } from '@agm/core';

import { AddressControlComponent } from './address-control.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MdInputModule,
        AgmCoreModule
    ],
    exports: [
        AddressControlComponent
    ],
    declarations: [
        AddressControlComponent
    ]
})
export class AddressControlModule { }
