import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AppURL } from './app.url';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: AppURL.Login, component: LoginComponent },
    { path: AppURL.Register, component: RegisterComponent },

    /** Auth module */
    {
        path: AppURL.Auth,
        loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
