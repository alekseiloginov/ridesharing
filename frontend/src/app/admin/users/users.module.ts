import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdIconModule, MdButtonModule, MdDialogModule, MdToolbarModule, MdSnackBarModule } from '@angular/material';

import { RTListsModule } from 'right-angled';

import { DeleteConfirmDialogModule } from '../../rs-components/delete-confirm-dialog';
import { UserDetailModule } from './user-detail';
import { UsersService } from './users.service';
import { UsersComponent } from './users.component';

@NgModule({
    imports: [
        CommonModule,
        RTListsModule,
        MdIconModule,
        MdButtonModule,
        MdDialogModule,
        MdToolbarModule,
        MdSnackBarModule,
        UserDetailModule,
        DeleteConfirmDialogModule
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
