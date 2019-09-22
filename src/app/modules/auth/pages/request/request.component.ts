import { Component, OnInit, NgZone } from '@angular/core';
import Stepper from 'bs-stepper';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { AppURL } from 'src/app/app.url';
import { IAccount, AccountService } from 'src/app/services/account.service';
import { AuthenService } from 'src/app/services/authen.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router } from '@angular/router';

declare const $;

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.css']
})

export class RequestComponent implements OnInit {

    constructor(
        private builder: FormBuilder,
        private accountService: AccountService,
        private authenService: AuthenService,
        private alertService: AlertService,
        private router: Router,
    ) {
        this.initialLoadUserLogin();
        this.createFormData();
    }

    private stepper: Stepper

    Url = AppURL;
    form: FormGroup;
    userLogin: IAccount;

    options = true;

    get funded(): FormControl { return this.form.get('req_member').get('funded') as FormControl }

    get funds(): FormArray { return this.form.get('req_member').get('funds') as FormArray }
    get borrows(): FormArray { return this.form.get('req_member').get('borrows') as FormArray }

    ngOnInit() {
        this.stepper = new Stepper(document.querySelector('#stepperRequest'), {});
    }

    /** เพิ่ม Form รายการที่เคยได้รับทุน */
    addFund(): void {
        this.funds.push(
            this.builder.group({
                year: [],
                type: [],
                name: [],
                amount: []
            })
        );
    }

    /** ลบ Form รายการที่เลือก */
    removeFund(index?: number): void {
        this.funds.removeAt(index);
    }

    /** เพิ่ม Form รายการที่เคยกู้ กยศ. */
    addBorrow(): void {
        this.borrows.push(
            this.builder.group({
                year: [],
                educ_level: [],
                stud_level: [],
                campus: [],
                amount: []
            })
        );
    }

    /** ลบ Form รายการที่เลือก */
    removeBorrow(index?: number): void {
        this.borrows.removeAt(index);
    }

    /** ​ดึงข้อมูลผู้ใช้งานจาก Access Token */
    private initialLoadUserLogin() {
        this.accountService
            .getUserLogin(this.authenService.getAuthenticated())
            .then(res => {
                this.userLogin = res;
                console.log(this.userLogin);
            })
            .catch(err => {
                this.alertService.notify(err.Message);
                this.authenService.clearAuthenticated();
                this.router.navigate(['/', AppURL.Login]);
            });
    }

    /** สร้างฟอร๋ม */
    private createFormData() {
        this.form = this.builder.group({
            //#region ประเภทการกู้
            req_year: [{ value: "2562", disabled: true }],
            req_campus: [{ value: "1", disabled: true }],
            req_type: ["1"],
            req_loanmem: ["Yes"],
            req_loanproved: [],
            req_study_fee: [true],
            req_study_relate: [true],
            req_study_live: [true],
            //#endregion

            //#region ส่วนของข้อมูลส่วนตัว
            req_member: this.builder.group({
                titlename: [],
                firstname: [],
                lastname: [],
                birthdate: [],
                age: [{ value: 0, disabled: true }],
                nationality: [],
                ethnicity: [],
                education_level: [],
                student_level: [],
                faculty: [],
                branch: [],
                program: [],
                grade: [],
                support: this.builder.group({
                    name: [],
                    relation: [],
                    amount: []
                }),
                //#region ส่วนของที่อยู่
                add_permanent: this.builder.group({
                    adddress: [],
                    province: [],
                    district: [],
                    sub_district: [],
                    postcode: [],
                    telephone: []
                }),
                add_present: this.builder.group({
                    adddress: [],
                    province: [],
                    district: [],
                    sub_district: [],
                    postcode: [],
                    telephone: []
                }),
                //#endregion
                graduated: ["No"],
                graduate: this.builder.group({
                    academy: [],
                    faculty: [],
                    branch: []
                }),
                funded: ["No"],
                funds: this.builder.array([]),
                borrowed: ["No"],
                borrows: this.builder.array([]),

            }),
            //#endregion
        });
    }

    next() {
        this.stepper.next();
    }

    previous() {
        this.stepper.previous();
    }

    onSubmit(): void {
        console.log(this.form.value);
    }

}
