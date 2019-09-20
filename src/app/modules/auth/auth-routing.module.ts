import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthURL } from './auth.url';


const routes: Routes = [
    { path: '', redirectTo: AuthURL.Profile, pathMatch: 'full' },
    { path: AuthURL.Profile, component: ProfileComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
