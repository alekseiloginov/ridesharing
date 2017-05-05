import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TabsModule } from '../rs-components/tabs';
import { AdminComponent } from './admin.component';
import { OfficesModule } from './offices';
import { UsersModule } from './users';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TabsModule,
        OfficesModule,
        UsersModule
    ],
    exports: [],
    declarations: [AdminComponent],
    providers: [],
})
export class AdminModule { }
