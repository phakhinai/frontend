import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from 'src/app/modules/auth/auth.url';
import { IAuthNavbarComponent } from './auth-navbar.interface';
import { IAccount, AccountService } from 'src/app/services/account.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth-navbar',
    templateUrl: './auth-navbar.component.html',
    styleUrls: ['./auth-navbar.component.css']
})
export class AuthNavbarComponent implements OnInit, IAuthNavbarComponent {

    constructor(
        private accountService: AccountService,
        private authenService: AuthenService,
        private alertService: AlertService,
        private router: Router
    ) {
        this.initialLoadUserLogin();
    }

    ngOnInit() { }

    AppURL = AppURL;
    AuthURL = AuthURL;
    userLogin: IAccount;

    /** ออกจากระบบ */
    onLogout() {
        this.alertService.notify('ออกจากระบบสำเร็จ', 'แจ้งเตือน', 'info');
        this.authenService.clearAuthenticated();
        this.router.navigate(['/', AppURL.Login]);
    }

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
