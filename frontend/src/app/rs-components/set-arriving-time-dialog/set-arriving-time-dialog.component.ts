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

    changeHour() {
        if (this.hour>23) {
            this.hour = 23;
        }
        if (this.hour<0) {
            this.hour = 0;
        }
    }
    changeMinute() {
        if (this.minute>59) {
            this.minute = 59;
        }
        if (this.minute<0) {
            this.minute = 0;
        }
    }
}
