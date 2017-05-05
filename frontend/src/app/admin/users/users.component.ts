import { UserDetailComponent } from './user-detail/user-detail.component';
import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Rx';

import { User, UsersService } from './users.service';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog.component';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    constructor(private usersService: UsersService, private dialog: MdDialog) { }

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
            data: {
                user,
                primaryButtonLabel: 'Update',
                title: 'Update Existing User'
            }
        });
        dialogRef.afterClosed().subscribe((result: User) => {
            if (result) {
                this.usersService.updateUser(result);
            }
        });
    }

    openCreateUserDialog() {
        const dialogRef = this.dialog.open(UserDetailComponent, {
            data: {
                user: null,
                primaryButtonLabel: 'Create',
                title: 'Create User'
            }
        });
        dialogRef.afterClosed().subscribe((result: User) => {
            if (result) {
                this.usersService.createUser(result);
            }
        });
    }
}
