import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MD_DIALOG_DATA, MdDialog, MdDialogRef } from '@angular/material';
import { Address } from './address';

@Component({
    selector: 'app-office-detail',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent implements OnInit {

    mainForm: FormGroup;

    constructor(public dialogRef: MdDialogRef<AddressComponent>,
                private dialog: MdDialog,
                @Inject(MD_DIALOG_DATA) public data: { office?: Address, primaryButtonLabel: string, title: string },
                fb: FormBuilder) {
        this.setupForm(fb, data.office);
    }

    ngOnInit() { }

    setupForm(fb: FormBuilder, office: Address) {
        this.mainForm = fb.group({
            address: [null]
        });
        if (office) {
            this.mainForm.patchValue({ address: office });
        }
    }
}
