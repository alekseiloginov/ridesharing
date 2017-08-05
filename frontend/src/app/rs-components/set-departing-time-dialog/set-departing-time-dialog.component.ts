import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

@Component({
    selector: 'app-set-departing-time',
    templateUrl: 'set-departing-time-dialog.html'
})
export class SetDepartingTimeDialogComponent implements OnInit {
    private hour: number = 11;
    private minute: number = 0;

    constructor(public dialogRef: MdDialogRef<SetDepartingTimeDialogComponent>,
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
