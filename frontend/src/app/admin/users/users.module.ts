import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './users.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        UsersComponent
    ],
    declarations: [
        UsersComponent
    ]
})
export class UsersModule { }
