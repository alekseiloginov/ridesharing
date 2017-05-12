import { NgModule } from '@angular/core';
import { MdButtonModule } from '@angular/material';

import { DeleteConfirmDialogComponent } from './delete-confirm-dialog.component';

@NgModule({
    imports: [
        MdButtonModule
    ],
    exports: [],
    declarations: [
        DeleteConfirmDialogComponent
    ],
    providers: [],
    entryComponents: [
        DeleteConfirmDialogComponent
    ]
})
export class DeleteConfirmDialogModule { }
