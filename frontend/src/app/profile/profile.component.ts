import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { Profile, ProfileService } from './profile.service';

@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {

    profileForm: FormGroup;

    constructor(fb: FormBuilder,
        private profileService: ProfileService,
        private snackBar: MdSnackBar,
        private activatedRoute: ActivatedRoute) {
        this.profileForm = fb.group({
            name: '',
            phone: '',
            home: ''
        });
    }

    ngOnInit() {
        this.activatedRoute.data.forEach((data: { profile: Profile }) => {
            this.profileForm.patchValue(data.profile);
        });
    }

    updateProfile() {
        this.profileService.updatePrifle(this.profileForm.value)
            .subscribe(resp => {
                this.snackBar.open('Profile updated', 'OK');
            });
    }
}
