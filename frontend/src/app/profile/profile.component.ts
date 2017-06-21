import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { Office } from '../rs-services/offices';
import { Profile, ProfileService } from './profile.service';

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
        private activatedRoute: ActivatedRoute) {
        this.profileForm = fb.group({
            name: '',
            phone: '',
            officeUri: '',
            home: '',
            driver: [false],
            active: [false],
            officeAddress: ''
        });
    }

    ngOnInit() {
        this.activatedRoute.data.forEach((data: { profile: Profile, offices: Office[] }) => {
            data.profile.officeAddress = this.getOfficeAddress(data.offices, data.profile.officeUri);
            this.profileForm.patchValue(data.profile);
            this.offices = data.offices;
        });
    }

    updateProfile() {
        this.profileService.updatePrifle(this.profileForm.value)
            .subscribe(resp => {
                this.snackBar.open('Profile updated', 'OK');
            });
    }

    getOfficeAddress(offices: Office[], officeUri: string): string {
        const office = offices.filter(x => 'api/addresses/'.concat(x.id) === officeUri);
        if (!!office && office.length > 0 ) {
            return office[0].address;
        }

        throw new Error('user\'s office not found');
    }
}
