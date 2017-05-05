import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule } from '@angular/material';

import { UserDetailComponent } from './user-detail.component';

@NgModule({
    imports: [
        CommonModule,
        MdButtonModule
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
