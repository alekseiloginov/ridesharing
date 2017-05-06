import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { ROLES, User } from '../users.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

    userForm: FormGroup;

    ROLES = ROLES;

    constructor(public dialogRef: MdDialogRef<UserDetailComponent>,
        @Inject(MD_DIALOG_DATA) public data: { user?: User, primaryButtonLabel: string, title: string },
        fb: FormBuilder) {
        this.setupForm(fb, data.user);
    }

    ngOnInit() { }

    private setupForm(fb: FormBuilder, user: User) {
        this.userForm = fb.group({
            id: '',
            email: ['', [Validators.required, Validators.email]],
            doSetPassword: [true],
            password: ['', Validators.required],
            repeatPassword: '',
            active: [false],
            role: ['', Validators.required]
        });
        let passwordControl = this.userForm.get('password');
        let repeatPasswordControl = this.userForm.get('repeatPassword');
        repeatPasswordControl.setValidators([Validators.required, equalValidator(passwordControl)]);
        if (user) {
            let doSetPasswordControl = this.userForm.get('doSetPassword');
            doSetPasswordControl.valueChanges.subscribe(value => {
                if (value) {
                    passwordControl.enable();
                    repeatPasswordControl.enable();
                } else {
                    passwordControl.disable();
                    repeatPasswordControl.disable();
                }
            });
            doSetPasswordControl.setValue(false);
            this.userForm.patchValue(user);
        }
    }
}

function equalValidator(controlToEqualTo: AbstractControl) {
    return (control: AbstractControl) => {
        return control.value !== controlToEqualTo.value ? { notEqual: true } : null;
    };
}
