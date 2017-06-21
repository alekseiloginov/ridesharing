import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { Office } from '../rs-services/offices';
import { Profile, ProfileService } from './profile.service';
import { AddressControlComponent } from "../rs-components/address-control/address-control.component";

@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {

    profileForm: FormGroup;
    offices: Office[];

    constructor(fb: FormBuilder,
        private profileService: ProfileService,
        private snackBar: MdSnackBar,
        private activatedRoute: ActivatedRoute,
        private addressControlComponent: AddressControlComponent) {
        this.profileForm = fb.group({
            name: '',
            phone: '',
            officeUri: '',
            home: '',
            driver: [false],
            active: [false]
        });
    }

    @ViewChild('officeAddress')
    public officeAddressElementRef: ElementRef;

    ngOnInit() {
        this.activatedRoute.data.forEach((data: { profile: Profile, offices: Office[] }) => {
            this.profileForm.patchValue(data.profile);
            this.offices = data.offices;
        });

        this.addressControlComponent.getLocationByAddress(this.officeAddressElementRef.nativeElement.value).then(
            result => {
                this.addressControlComponent.officeLat = (<any>result).lat;
                this.addressControlComponent.officeLng = (<any>result).lng;
            },
            error => {}
        );
    }

    updateProfile() {
        this.profileService.updatePrifle(this.profileForm.value)
            .subscribe(resp => {
                this.snackBar.open('Profile updated', 'OK');
            });
    }
}
