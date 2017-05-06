import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Rx';

import { User, UsersService } from './users.service';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog.component';
import { UserDetailComponent } from './user-detail';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    @ViewChild('list')
    usersListTable;

    constructor(private usersService: UsersService,
        private dialog: MdDialog,
        private snackBar: MdSnackBar) { }

    ngOnInit() { }

    getUsers = (): Observable<User[]> => {
        return this.usersService.getUsers();
    }

    openDeleteConfirm(user: User) {
        const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, { data: { user } });
        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                this.usersService.removeUser(user);
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
}
