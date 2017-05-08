import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdSnackBar } from '@angular/material';

import { ProfileService } from './profile.service';

@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {

    profileForm: FormGroup;

    constructor(fb: FormBuilder,
        private profileService: ProfileService,
        private snackBar: MdSnackBar) {
        this.profileForm = fb.group({
            name: '',
            phone: '',
            home: ''
        });
    }

    ngOnInit() {
        this.profileService.getProfile().subscribe(profile => {
            this.profileForm.patchValue(profile);
        });
    }

    updateProfile() {
        this.profileService.updatePrifle(this.profileForm.value)
            .subscribe(resp => {
                this.snackBar.open('Profile updated', 'OK');
            });
    }
}
