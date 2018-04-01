import { Component, OnInit, ViewChild } from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import { Observable } from 'rxjs/Rx';

import { DeleteConfirmDialogComponent } from '../../rs-components/delete-confirm-dialog';
import { ROLES, User, UsersService } from './users.service';
import { UserDetailComponent } from './user-detail';
import { Address } from '../address/address';
import { AddressComponent } from '../address';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    @ViewChild('list')
    usersListTable;

    address: Address =  {
        id: null,
        address: 'Nevskiy prospekt',
        latitude: 59.9325367,
        longitude: 30.3475981,
        type: 'HOME'
    };

    ROLES = ROLES.reduce(
        (acc, cur, i) => {
            acc[cur.value] = cur;
            return acc;
        },
        {}
    );

    constructor(private usersService: UsersService,
        private dialog: MdDialog,
        private snackBar: MdSnackBar) { }

    ngOnInit() { }

    getUsers = (): Observable<User[]> => {
        return this.usersService.getUsers();
    }

    openDeleteConfirm(user: User) {
        const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, { data: { label: user.name } });
        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                this.usersService.removeUser(user).subscribe(res => {
                    this.snackBar.open('User has been removed.', 'OK');
                    this.usersListTable.reloadData();
                });
            }
        });
    }

    openEditUserDialog(user: User) {
        const dialogRef = this.dialog.open(UserDetailComponent, {
            width: '400px',
            data: {
                user,
                primaryButtonLabel: 'Update',
                title: 'Update Existing User'
            }
        });
        dialogRef.afterClosed().subscribe((result: User) => {
            if (result) {
                this.usersService.updateUser(result).subscribe(res => {
                    this.snackBar.open('User has been updated.', 'OK');
                    this.usersListTable.reloadData();
                });
            }
        });
    }

    openCreateUserDialog() {
        const dialogRef = this.dialog.open(UserDetailComponent, {
            width: '400px',
            data: {
                user: null,
                primaryButtonLabel: 'Create',
                title: 'Create User'
            }
        });
        dialogRef.afterClosed().subscribe((user: User) => {
            if (user) {
                this.usersService.createUser(user).subscribe(res => {
                    this.snackBar.open('User has been created.', 'OK');
                    this.usersListTable.reloadData();
                });
            }
        });
    }

    editAddressDialog(address: Address) {
        let office: Address =  {
            id: null,
            address: 'Nevskiy prospekt',
            latitude: 59.9325367,
            longitude: 30.3475981,
            type: 'OFFICE'
        };
        const dialogRef = this.dialog.open(AddressComponent, {
            width: '800px',
            data: {
                office,
                primaryButtonLabel: 'Edit',
                title: 'Edit address'
            }
        });
        dialogRef.afterClosed().subscribe((user: User) => {
            if (user) {
                user.address = address;
                this.usersService.updateUser(user).subscribe(res => {
                    this.snackBar.open('Address has been updated.', 'OK');
                    this.usersListTable.reloadData();
                });
            }
        });
    }
}
