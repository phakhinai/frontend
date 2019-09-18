import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ContentComponent } from './layouts/content/content.component';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';

import { AlertService } from './services/alert.service';

@NgModule({
    declarations: [NavbarComponent, ContentComponent],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,

        NgSelectModule,
        ToastrModule.forRoot()
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,

        NgSelectModule,

        ContentComponent
    ],
    providers: [
        AlertService
    ]
})
export class SharedModule { }
