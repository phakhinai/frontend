import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ContentComponent } from './layouts/content/content.component';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { MatStepperModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';

import { AlertService } from './services/alert.service';
import { HttpService } from './services/http.service';
import { AuthNavbarComponent } from './auth-layouts/auth-navbar/auth-navbar.component';
import { AuthContentComponent } from './auth-layouts/auth-content/auth-content.component';
import { AuthSidebarComponent } from './auth-layouts/auth-sidebar/auth-sidebar.component';
import { AuthContentNonsidebarComponent } from './auth-layouts/auth-content-nonsidebar/auth-content-nonsidebar.component';

@NgModule({
    declarations: [NavbarComponent, ContentComponent, AuthNavbarComponent, AuthContentComponent, AuthSidebarComponent, AuthContentNonsidebarComponent],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,

        NgSelectModule,
        ToastrModule.forRoot(),
        MatStepperModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,

        NgSelectModule,
        MatStepperModule,
        MatDatepickerModule,
        MatNativeDateModule,

        ContentComponent,
        AuthContentComponent,
        AuthContentNonsidebarComponent
    ],
    providers: [
        AlertService,
        HttpService,
        { provide: MAT_DATE_LOCALE, useValue: 'th-TH' },
        {
            provide: MAT_DATE_FORMATS, useValue: {
                parse: {
                    dateInput: 'DD/MM/YYYY'
                },
                display: {
                    dateInput: 'DD/MM/YYYY'
                }
            }
        }
    ]
})
export class SharedModule { }
