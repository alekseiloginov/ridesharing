import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdIconModule, MdButtonModule, MdDialogModule, MdToolbarModule, MdSnackBarModule } from '@angular/material';

import { RTListsModule } from 'right-angled';

import { OfficeDetailModule } from './office-detail';
import { OfficesComponent } from './offices.component';

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
    ]
})
export class OfficesModule { }
