import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdIconModule, MdButtonModule, MdDialogModule, MdToolbarModule } from '@angular/material';

import { RTListsModule } from 'right-angled';

import { UserDetailModule } from './user-detail';
import { UsersService } from './users.service';
import { UsersComponent } from './users.component';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        RTListsModule,
        MdIconModule,
        MdButtonModule,
        MdDialogModule,
        MdToolbarModule,
        UserDetailModule
    ],
    exports: [
        UsersComponent
    ],
    declarations: [
        UsersComponent,
        DeleteConfirmDialogComponent
    ],
    providers: [
        UsersService
    ],
    entryComponents: [
        DeleteConfirmDialogComponent
    ]
})
export class UsersModule { }
