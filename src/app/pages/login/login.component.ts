import { Component, OnInit } from '@angular/core';
import { ILoginComponent } from './login.interface';
import { AppURL } from 'src/app/app.url';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, ILoginComponent {

    constructor(
        private builder: FormBuilder,
        private alertService: AlertService,
        private router: Router,
        private accountService: AccountService
    ) {
        this.createFormData();
    }

    ngOnInit() {

    }

    Url = AppURL;
    form: FormGroup;

    onSubmit(): void {

        /** เปลี่ยนสถานะช่องกรอกข้อมูล */
        this.form.get('studentcode').markAsTouched();
        this.form.get('password').markAsTouched();

        /** ตรวจสอบข้อมูล Validate */
        if (this.form.invalid) {
            return this.alertService.notify();
        }
        this.accountService
            .onLogin(this.form.value)
            .then(res => {
                console.log(res);
                // this.router.navigate(['/', AppURL.Register]);
            })
            .catch(err => this.alertService.notify(err.Message));
    }

    /** สร้างฟอร๋ม */
    private createFormData() {
        this.form = this.builder.group({
            studentcode: ['', Validators.required],
            password: ['', Validators.required],
            remember: [true]
        });
    }

}
