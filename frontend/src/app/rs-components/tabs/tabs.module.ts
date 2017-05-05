import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdTabsModule } from '@angular/material';

import { TabsComponent } from './tabs.component';

@NgModule({
    imports: [
        CommonModule,
        MdTabsModule,
        RouterModule
    ],
    exports: [
        TabsComponent
    ],
    declarations: [
        TabsComponent
    ]
})
export class TabsModule { }
