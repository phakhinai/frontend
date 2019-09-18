import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { IRegisterComponent } from './register.interface';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/app.url';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit, IRegisterComponent {

    constructor(
        private builder: FormBuilder,
        private alertService: AlertService,
        private accountService: AccountService,
        private router: Router
    ) {
        this.createFormData();
    }

    Url = AppURL;
    form: FormGroup;

    /** Load data disable button */
    submitLoading = false;

    ngOnInit() { }

    /** บันทึกข้อมูลสมัครสมาชิก */
    onSubmit(): void {

        /** เปลี่ยนสถานะช่องกรอกข้อมูล */
        this.form.get('idcard').markAsTouched();
        this.form.get('titlename').markAsTouched();
        this.form.get('firstname').markAsTouched();
        this.form.get('lastname').markAsTouched();
        this.form.get('studentcode').markAsTouched();
        this.form.get('email').markAsTouched();

        /** ตรวจสอบข้อมูล Validate */
        if (this.form.invalid) {
            return this.alertService.notify();
        }

        /** แสดงปุ่ม Loading */
        this.submitLoading = true;

        /** ส่งข้อมูลไปที่ Web Server */
        // this.accountService
        //     .onRegister(this.form.value)
        //     .then(res => {
        //         this.alertService.notify('ลงทะเบียนสำเร็จ', 'แจ้งเตือน', 'success');
        //         this.router.navigate(['/', 'login']);
        //     })
        //     .catch(err => this.alertService.notify(err.Message));

        /** ส่งข้อมูลไปบันทึก */
        this.accountService
            .onRegister(this.form.value)
            .subscribe(
                () => {
                    // console.log({ message: 'Save successful.' });
                    this.alertService.notify('ลงทะเบียนสำเร็จ', 'แจ้งเตือน', 'success');
                    this.submitLoading = false;
                    this.router.navigate(['/', 'login']);
                },
                (error) => {
                    this.alertService.notify(error.Message)
                    this.submitLoading = false;
                }
            );
    }

    /** สร้างฟอร๋ม */
    private createFormData() {
        this.form = this.builder.group({
            idcard: [Math.floor(Math.random() * 9000000000000) + 1000000000000, [Validators.required, Validators.pattern(/^[0-9]{13}$/)]],
            titlename: ['นาย', [Validators.required]],
            firstname: ['ภาคินัย', [Validators.required]],
            lastname: ['หมายสุข', [Validators.required]],
            studentcode: [(Math.floor(Math.random() * 900000000000) + 100000000000) + '-7', [Validators.required]],
            email: [Math.floor(Math.random() * 1000001) + '@gmail.com', [Validators.required, Validators.email]]
        });
    }

    /** สร้างฟอร๋ม */
    // private createFormData() {
    //     this.form = this.builder.group({
    //         idcard: ['', [Validators.required, Validators.pattern(/^[0-9]{13}$/)]],
    //         titlename: ['', [Validators.required]],
    //         firstname: ['', [Validators.required]],
    //         lastname: ['', [Validators.required]],
    //         studentcode: ['', [Validators.required]],
    //         email: ['', [Validators.required, Validators.email]]
    //     });
    // }

}
