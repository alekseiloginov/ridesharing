import { Component, OnInit, ViewChild } from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import { Observable } from 'rxjs/Rx';

import { AddressComponent } from '../address';
import { DeleteConfirmDialogComponent } from '../../rs-components/delete-confirm-dialog';
import { OfficesService, Office } from '../../rs-services/offices';
import { Address } from "../address/address";

@Component({
    selector: 'app-offices',
    templateUrl: './offices.component.html',
    styleUrls: ['./offices.component.css']
})
export class OfficesComponent implements OnInit {

    @ViewChild('list')
    listTable;

    constructor(private officesService: OfficesService,
        private dialog: MdDialog,
        private snackBar: MdSnackBar) { }

    ngOnInit() { }

    getOffices = (): Observable<Office[]> => {
        return this.officesService.getOffices();
    }

    openDeleteConfirm(office: Office) {
        const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, { data: { label: office.address } });
        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                this.officesService.remove(office).subscribe(res => {
                    this.snackBar.open('Office has been removed.', 'OK');
                    this.listTable.reloadData();
                });
            }
        });
    }

    createOfficeDialog() {
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
                primaryButtonLabel: 'Create',
                title: 'Create Office'
            }
        });
        dialogRef.afterClosed().subscribe((office: Office) => {
            if (office) {
                this.officesService.create(office).subscribe(res => {
                    this.snackBar.open('Office has been created.', 'OK');
                    this.listTable.reloadData();
                });
            }
        });
    }

    editOfficeDialog(office: Address) {
        const dialogRef = this.dialog.open(AddressComponent, {
            width: '800px',
            data: {
                office,
                primaryButtonLabel: 'Update',
                title: 'Update Existing Office'
            }
        });
        dialogRef.afterClosed().subscribe((updatedOffice: Office) => {
            if (updatedOffice) {
                this.officesService.update(updatedOffice).subscribe(res => {
                    this.snackBar.open('Office has been updated.', 'OK');
                    this.listTable.reloadData();
                });
            }
        });
    }
}
