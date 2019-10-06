import { Component, OnInit } from '@angular/core';
import { AccountService, IAccount } from 'src/app/services/account.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from 'src/app/modules/auth/auth.url';

@Component({
    selector: 'app-auth-content-nonsidebar',
    templateUrl: './auth-content-nonsidebar.component.html',
    styleUrls: ['./auth-content-nonsidebar.component.css']
})
export class AuthContentNonsidebarComponent implements OnInit {

    constructor(
        private accountService: AccountService,
        private authenService: AuthenService,
        private alertService: AlertService,
        private router: Router) {
        this.initialLoadUserLogin();
    }

    ngOnInit() {
    }

    AppURL = AppURL;
    AuthURL = AuthURL;
    userLogin: IAccount;

    /** ​ดึงข้อมูลผู้ใช้งานจาก Access Token */
    private initialLoadUserLogin() {
        this.accountService
            .getUserLogin(this.authenService.getAuthenticated())
            .then(res => {
                this.userLogin = res;
            })
            .catch(err => {
                this.alertService.notify(err.Message);
                this.authenService.clearAuthenticated();
                this.router.navigate(['/', AppURL.Login]);
            });
    }

}
