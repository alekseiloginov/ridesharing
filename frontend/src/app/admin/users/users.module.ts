import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdIconModule, MdButtonModule } from '@angular/material';

import { RTListsModule } from 'right-angled';

import { UsersService } from './users.service';
import { UsersComponent } from './users.component';

@NgModule({
    imports: [
        CommonModule,
        RTListsModule,
        MdIconModule,
        MdButtonModule
    ],
    exports: [
        UsersComponent
    ],
    declarations: [
        UsersComponent
    ],
    providers: [
        UsersService
    ]
})
export class UsersModule { }
