import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    constructor(
        private builder: FormBuilder,
        private alertService: AlertService
    ) {
        this.createFormData();
    }

    form: FormGroup;

    /** Load data disable button */
    submitLoading = false;

    ngOnInit() {
    }

    onSubmit() {
        this.form.get('idcard').markAsTouched();
        this.form.get('titlename').markAsTouched();
        this.form.get('firstname').markAsTouched();
        this.form.get('lastname').markAsTouched();
        this.form.get('studentcode').markAsTouched();
        this.form.get('email').markAsTouched();

        if (this.form.invalid) {
            return this.alertService.notify();
            // return alert('ข้อมูลบางอย่างไม่ถูกต้อง กรุณาลองอีกครั้ง');
        }

        this.submitLoading = true;


        this.alertService.notify('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือน', 'success');
        this.submitLoading = false;

        /** ส่งข้อมูลไปบันทึก */
        // this.accountService
        // 	.onRegister(this.form.value)
        // 	.subscribe(
        // 		() => {
        // 			// console.log({ message: 'Save successful.' });
        // 			this.snotifyService.success('บันทึกข้อมูลสำเร็จ', 'บันทึกข้อมูล', this.getConfig());
        // 			this.submitLoading = false;
        // 		},
        // 		(error) => {
        // 			this.snotifyService.error(error.message, 'ผิดพลาด', this.getConfig());
        // 			this.submitLoading = false;
        // 		}
        // 	);
    }

    // Create Form
    private createFormData() {
        this.form = this.builder.group({
            idcard: ['1309900485128', [Validators.required, Validators.pattern(/^[0-9]{13}$/)]],
            titlename: ['นาย', [Validators.required]],
            firstname: ['ภาคินัย', [Validators.required]],
            lastname: ['หมายสุข', [Validators.required]],
            studentcode: ['551733022022-7', [Validators.required]],
            email: ['m.phakhinai@gmail.com', [Validators.required, Validators.email]]
        });
    }

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
