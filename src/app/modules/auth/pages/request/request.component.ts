import { Component, OnInit, NgZone } from '@angular/core';
import Stepper from 'bs-stepper';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
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

    get req_funds(): FormArray { return this.form.get('req_funds') as FormArray }
    get req_borrows(): FormArray { return this.form.get('req_borrows') as FormArray }

    addFund() {
        this.req_funds.push(
            this.builder.group({
                year: [],
                type: [],
                name: [],
                amount: []
            })
        );
    }

    addBorrow() {
        this.req_borrows.push(
            this.builder.group({
                year: [],
                educ_level: [],
                stud_level: [],
                campus: [],
                amount: []
            })
        );
    }

    ngOnInit() {
        this.stepper = new Stepper(document.querySelector('#stepperRequest'), {});
    }

    onSubmit(): void {
        console.log(this.form.value);
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
            req_year: [{ value: "2562", disabled: true }],
            req_campus: [{ value: "1", disabled: true }],
            req_type: ["1"],
            req_loanmem: ["Yes"],
            req_loanproved: [],
            req_study_fee: [true],
            req_study_relate: [true],
            req_study_live: [true],

            //#region ส่วนของข้อมูลส่วนตัว
            req_titlename: [],
            req_firstname: [],
            req_lastname: [],
            req_birthdate: [],
            req_age: [{ value: 0, disabled: true }],
            req_nationality: [],
            req_ethnicity: [],
            req_education_level: [],
            req_student_level: [],
            req_faculty: [],
            req_branch: [],
            req_program: [],
            req_grade: [],
            //#endregion

            //#region ส่วนของที่อยู่
            req_perm_adddress: [],
            req_perm_province: [],
            req_perm_district: [],
            req_perm_sub_district: [],
            req_perm_postcode: [],
            req_perm_telephone: [],
            req_pres_adddress: [],
            req_pres_province: [],
            req_pres_district: [],
            req_pres_sub_district: [],
            req_pres_postcode: [],
            req_pres_telephone: [],
            //#endregion

            //#region ส่วนของผู้อุปการะด้านการเงิน
            req_sup_name: [],
            req_sup_relation: [],
            req_sup_amount: [],
            //#endregion

            // ส่วนของประวัติการศึกษา
            req_grad_status: ["No"],
            req_grad_from: [],
            req_grad_faculty: [],
            req_grad_branch: [],

            // ส่วนของทุนการศึกษา
            req_fund_status: ["No"],
            req_funds: this.builder.array([]),

            // ส่วนของกองทุนเงินให้กู้ยืมเพื่อการศึกษา
            req_borr_status: ["No"],
            req_borrows: this.builder.array([])
        });
    }

    next() {
        this.stepper.next();
    }

    previous() {
        this.stepper.previous();
    }

}
