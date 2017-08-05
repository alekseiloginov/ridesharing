import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {MdDialog, MdSnackBar} from '@angular/material';

import {Office} from '../rs-services/offices';
import {NotifyService} from '../rs-services/notify';
import {Profile, ProfileService} from './profile.service';

import {SetDepartingTimeDialogComponent} from '../rs-components/set-departing-time-dialog/set-departing-time-dialog.component'

@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {

    profileForm: FormGroup;
    offices: Office[];

    constructor(fb: FormBuilder,
        private profileService: ProfileService,
        private dialog: MdDialog,
        private snackBar: MdSnackBar,
        private notifyService: NotifyService,
        private activatedRoute: ActivatedRoute) {
        this.profileForm = fb.group({
            name: '',
            phone: '',
            officeUri: '',
            home: '',
            driver: [false],
            active: [false],
            office: ''
        });
    }

    ngOnInit() {
        this.activatedRoute.data.forEach((data: { profile: Profile, offices: Office[] }) => {
            data.profile.office = this.getOffice(data.offices, data.profile.officeUri);
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

    getOffice(offices: Office[], officeUri: string): Office {
        const office = offices.filter(x => 'api/addresses/'.concat(x.id) === officeUri);
        if (!!office && office.length > 0 ) {
            return office[0];
        }

        throw new Error('user\'s office not found');
    }

    openSetDepartingTime() {
        const dialogRef = this.dialog.open(SetDepartingTimeDialogComponent, {
            width: '400px',
            data: {
                primaryButtonLabel: 'Update',
                title: 'Update Existing User'
            }
        });
        dialogRef.afterClosed().subscribe((result: string) => {
            if (result) {
                this.notifyService.notifyAboutDeparting(result).subscribe(res => {
                    this.snackBar.open('Passengers are successfully notified.', 'OK');
                });
            }
        });
    }
}
