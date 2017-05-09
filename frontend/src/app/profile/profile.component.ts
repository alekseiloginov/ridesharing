import { Component, OnInit } from '@angular/core';
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
            office: '',
            home: ''
        });
    }

    ngOnInit() {
        this.activatedRoute.data.forEach((data: { profile: Profile, offices: Office[] }) => {
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
}
