import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { User } from '../users.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

    constructor(public dialogRef: MdDialogRef<UserDetailComponent>,
        @Inject(MD_DIALOG_DATA) public data: { user?: User, primaryButtonLabel: string, title: string }) { }

    ngOnInit() { }
}
