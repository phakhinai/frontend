import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestComponent } from './pages/request/request.component';
import { RequestListComponent } from './pages/request-list/request-list.component';


@NgModule({
    declarations: [ProfileComponent, RequestComponent, RequestListComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule
    ]
})
export class AuthModule { }
