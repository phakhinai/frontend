import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AccountService, IAccount } from 'src/app/services/account.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { AuthURL } from 'src/app/modules/auth/auth.url';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

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

    /** ​ดึงข้อมูลผู้ใช้งานจาก Access Token */
    private initialLoadUserLogin() {
        if (this.authenService.getAuthenticated()) {
            this.accountService
                .getUserLogin(this.authenService.getAuthenticated())
                .then(res => {
                    this.alertService.notify('กลับเข้าสู่ระบบ', 'แจ้งเตือน', 'info');
                    this.userLogin = res;
                    this.router.navigate(['/', AppURL.Auth]);
                })
                .catch(err => {
                    this.alertService.notify(err.Message);
                    this.authenService.clearAuthenticated();
                    this.router.navigate(['/', AppURL.Login]);
                });
        }
    }
}
