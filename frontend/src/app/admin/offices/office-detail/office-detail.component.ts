import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

import { Office } from '../../../rs-services/offices';

@Component({
    selector: 'app-office-detail',
    templateUrl: './office-detail.component.html',
    styleUrls: ['./office-detail.component.css']
})
export class OfficeDetailComponent implements OnInit {

    mainForm: FormGroup;

    constructor(public dialogRef: MdDialogRef<OfficeDetailComponent>,
        @Inject(MD_DIALOG_DATA) public data: { office?: Office, primaryButtonLabel: string, title: string },
        fb: FormBuilder) {
        this.setupForm(fb, data.office);
    }

    ngOnInit() { }

    setupForm(fb: FormBuilder, office: Office) {
        this.mainForm = fb.group({
            address: [null]
        });
        if (office) {
            this.mainForm.patchValue({ address: office });
        }
    }
}
