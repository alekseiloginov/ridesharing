import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-delete-confirm-dialog',
    templateUrl: 'delete-confirm-dialog.component.html'
})
export class DeleteConfirmDialogComponent implements OnInit {
    constructor(public dialogRef: MdDialogRef<DeleteConfirmDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: { label: string }) { }

    ngOnInit() { }
}
