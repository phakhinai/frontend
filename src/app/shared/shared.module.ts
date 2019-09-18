import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ContentComponent } from './layouts/content/content.component';

import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

        NgSelectModule,
        ToastrModule.forRoot()
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule,

        NgSelectModule,

        ContentComponent
    ],
    providers: [
        AlertService
    ]
})
export class SharedModule { }
