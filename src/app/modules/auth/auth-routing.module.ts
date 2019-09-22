import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthURL } from './auth.url';
import { ProfileComponent } from './pages/profile/profile.component';
import { RequestListComponent } from './pages/request-list/request-list.component';
import { RequestComponent } from './pages/request/request.component';


const routes: Routes = [
    { path: '', redirectTo: AuthURL.Profile, pathMatch: 'full' },
    { path: AuthURL.Profile, component: ProfileComponent },
    { path: AuthURL.RequestList, component: RequestListComponent },
    { path: AuthURL.Request, component: RequestComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
