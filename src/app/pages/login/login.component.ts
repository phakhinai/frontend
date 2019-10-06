import { Component, OnInit } from '@angular/core';
import { ILoginComponent } from './login.interface';
import { AppURL } from 'src/app/app.url';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AccountService } from 'src/app/services/account.service';
import { AuthenService } from 'src/app/services/authen.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, ILoginComponent {

    constructor(
        private builder: FormBuilder,
        private alertService: AlertService,
        private accountService: AccountService,
        private authenService: AuthenService,
        private router: Router
    ) {
        this.createFormData();
    }

    ngOnInit() { }

    Url = AppURL;
    form: FormGroup;

    /** Load data disable button */
    submitLoading = false;

    onSubmit(): void {

        /** เปลี่ยนสถานะช่องกรอกข้อมูล */
        this.form.get('studentcode').markAsTouched();
        this.form.get('password').markAsTouched();

        /** ตรวจสอบข้อมูล Validate */
        if (this.form.invalid) {
            return this.alertService.notify();
        }

        /** แสดงปุ่ม Loading */
        this.submitLoading = true;

        /** ส่งข้อมูลไปบันทึก */
        this.accountService
            .onLogin(this.form.value)
            .then(
                res => {
                    this.submitLoading = false;
                    // เก็บ Access token ไว้ใน Local storage
                    this.authenService.setAuthenticated(res.accessToken);
                    this.alertService.notify('เข้าสู่ระบบสำเร็จ', 'แจ้งเตือน', 'info');
                    this.router.navigate(['/', this.Url.Auth]);
                })
            .catch(err => {
                this.submitLoading = false;
                this.alertService.notify(err.Message);
            });
    }

    /** สร้างฟอร๋ม */
    private createFormData() {
        this.form = this.builder.group({
            studentcode: ['551733022022-7', Validators.required],
            password: ['1234', Validators.required],
            remember: [true]
        });
    }

}
