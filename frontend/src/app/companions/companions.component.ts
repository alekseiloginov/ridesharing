import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { Office } from '../rs-services/offices';

import { CompanionsService, PossibleComanion } from './companions.service';

@Component({
    selector: 'companions',
    templateUrl: 'companions.component.html'
})

export class CompanionsComponent implements OnInit {

    filterForm: FormGroup;
    offices: Office[];
    officesById: { [key: string]: Office };

    @ViewChild('list')
    usersListTable;

    constructor(private activatedRoute: ActivatedRoute,
        private companionsService: CompanionsService,
        fb: FormBuilder) {
        this.setupForm(fb);
    }

    setupForm(fb: FormBuilder) {
        this.filterForm = fb.group({
            officeId: ['', Validators.required],
            distanceKm: [10, Validators.required]
        });
    }

    ngOnInit() {
        this.activatedRoute.data.forEach((data: { currentUserOffice: string, offices: Office[] }) => {
            this.filterForm.patchValue({ officeId: data.currentUserOffice });
            this.offices = data.offices;
            this.officesById = this.offices.reduce(
                (acc, cur, i) => {
                    acc['' + cur.id] = cur;
                    return acc;
                },
                {}
            );
        });
    }

    getUsers = (): Observable<PossibleComanion[]> => {
        return this.companionsService.search(this.filterForm.value);
    }

    search() {
        this.usersListTable.reloadData();
    }
}
