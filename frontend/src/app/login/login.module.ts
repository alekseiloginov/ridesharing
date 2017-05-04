import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MdButtonModule, MdCheckboxModule, MdInputModule } from '@angular/material';

import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MdCheckboxModule,
        MdButtonModule,
        MdInputModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule { }
