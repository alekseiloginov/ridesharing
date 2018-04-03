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
    lat: number;
    lng: number;

    constructor(public dialogRef: MdDialogRef<AddressComponent>,
                private dialog: MdDialog,
                @Inject(MD_DIALOG_DATA) public data: { office?: Address, primaryButtonLabel: string, title: string },
                fb: FormBuilder) {
        this.setupForm(fb, data.office);
    }

    ngOnInit() {
        this.propagateChange = () => { };
    }

    setupForm(fb: FormBuilder, office: Address) {
        this.mainForm = fb.group({
            address: [null],
            latitude: [null],
            longitude: [null]
        });
        if (office) {
            this.mainForm.patchValue({ address: office });
        }

        this.subscribeOnValueChange();
    }

    propagateChange: (_: Address) => void;

    subscribeOnValueChange() {
        this.mainForm.valueChanges.subscribe(() => {
            this.propagateChange(this.mainForm.value);
        });
        this.mainForm.get('latitude').valueChanges.subscribe(newLat => {
            if (newLat) {
                this.setCoords(this.lng, newLat);
            }
        });
        this.mainForm.get('longitude').valueChanges.subscribe(newLng => {
            if (newLng) {
                this.setCoords(newLng, this.lat);
            }
        });
    }

    setCoords(lng, lat) {
        console.log('changing coords from: ', this.lng, this.lat);
        this.lng = +lng;
        this.lat = +lat;
        console.log('new coords: ', this.lng, this.lat);
    }
}
