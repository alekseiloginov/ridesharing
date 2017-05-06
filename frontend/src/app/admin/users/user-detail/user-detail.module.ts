import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdInputModule, MdCheckboxModule } from '@angular/material';

import { UserDetailComponent } from './user-detail.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MdButtonModule,
        MdInputModule,
        MdCheckboxModule
    ],
    exports: [
        UserDetailComponent
    ],
    declarations: [
        UserDetailComponent
    ],
    entryComponents: [
        UserDetailComponent
    ]
})
export class UserDetailModule { }
