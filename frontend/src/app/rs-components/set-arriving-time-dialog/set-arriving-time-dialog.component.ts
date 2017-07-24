import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-set-arriving-time',
    templateUrl: 'set-arriving-time-dialog.html'
})
export class SetArrivingTimeDialogComponent implements OnInit {
    private hour: number = 12;
    private minute: number = 26;

    constructor(public dialogRef: MdDialogRef<SetArrivingTimeDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: { label: string }) { }

    ngOnInit() { }
}
