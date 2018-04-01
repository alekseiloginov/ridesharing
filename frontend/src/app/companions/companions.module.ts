import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdInputModule, MdSelectModule } from '@angular/material';
import { AddressControlModule } from '../rs-components/address-control';

import { RTListsModule } from 'right-angled';

import { CompanionsService } from './companions.service';
import { CompanionsComponent } from './companions.component';

@NgModule({
    imports: [
        CommonModule,
        MdButtonModule,
        MdInputModule,
        MdSelectModule,
        ReactiveFormsModule,
        RTListsModule,
        AddressControlModule
    ],
    exports: [
        CompanionsComponent
    ],
    declarations: [
        CompanionsComponent
    ],
    providers: [
        CompanionsService
    ],
})
export class CompanionsModule { }
