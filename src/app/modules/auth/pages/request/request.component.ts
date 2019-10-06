import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { AppURL } from 'src/app/app.url';
import { IAccount, AccountService } from 'src/app/services/account.service';
import { Observable } from 'rxjs';
import { AuthenService } from 'src/app/services/authen.service';
import { RequestService } from '../../services/request.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.css']
})

export class RequestComponent implements OnInit {

    constructor(
        private builder: FormBuilder,
        private _formBuilder: FormBuilder,
        private alertService: AlertService,
        private accountService: AccountService,
        private authenService: AuthenService,
        private requestService: RequestService,
        private router: Router
    ) {
        this.createFormData();
        this.initialLoadData();
    }

    Url = AppURL;
    form: FormGroup;
    userLogin: Observable<IAccount>;
    token: string;

    options = true;

    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    get funded(): FormControl { return this.form.get('req_member').get('funded') as FormControl }
    get funds(): FormArray { return this.form.get('req_member').get('funds') as FormArray }
    get borrows(): FormArray { return this.form.get('req_member').get('borrows') as FormArray }
    get sibling_studies(): FormArray { return this.form.get('req_family').get('sibling_studies') as FormArray }
    get sibling_works(): FormArray { return this.form.get('req_family').get('sibling_works') as FormArray }

    ngOnInit() {

        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });

    }

    setRequestLoanMem(val) {
        val == "No" ? this.form.get('req_loanproved').setValue('Yes') : this.form.get('req_loanproved').setValue(null);
    }

    onSubmit() {
        console.log(this.form.value);
        /** ส่งข้อมูลไปบันทึก */
        this.requestService
            .createRequest(this.form.value)
            .then(res => {
                console.log(res);
                this.alertService.notify('บันทึกข้อมูลสำเร็จ', 'บันทึกข้อมูล', 'success');
                this.router.navigate(['/', this.Url.Auth]);
            })
            .catch(err => {
                this.alertService.notify(err.Message);
            });
    }

    //#region Function ส่วนของหน้า ข้อมูลครอบครัว

    addSiblingStudy(): void {
        this.sibling_studies.push(
            this.builder.group({
                be: [],
                sex: [],
                age: [],
                level: [],
                school: []
            })
        )
    }

    /** ลบ Form รายการที่เลือก */
    removeSiblingStudy(index?: number): void {
        this.sibling_studies.removeAt(index);
    }

    addSiblingWork(): void {
        this.sibling_works.push(
            this.builder.group({
                be: [],
                sex: [],
                age: [],
                level: [],
                school: []
            })
        )
    }

    /** ลบ Form รายการที่เลือก */
    removeSiblingWork(index?: number): void {
        this.sibling_works.removeAt(index);
    }

    //#endregion

    //#region Function ส่วนของหน้า ข้อมูลส่วนตัว

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

    //#endregion

    /** กำหนดค่าที่มีอยู่แล้ว */
    private initialLoadData() {
        this.accountService
            .getUserLogin(this.authenService.getAuthenticated())
            .then(res => {
                this.form.get('req_member').get('titlename').setValue(res.titlename);
                this.form.get('req_member').get('firstname').setValue(res.firstname);
                this.form.get('req_member').get('lastname').setValue(res.lastname);
            })
            .catch(err => {

            });
    }

    /** สร้างฟอร๋มทั้งหมด */
    private createFormData() {
        this.form = this.builder.group({
            //#region ประเภทการกู้
            req_year: ["2562"],
            req_campus: ["1"],
            req_type: ["1"],
            req_loanmem: ["New"],
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
                age: [{ value: 0, disabled: false }],
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
                    address: [],
                    province: [],
                    district: [],
                    sub_district: [],
                    postcode: [],
                    telephone: []
                }),
                add_present: this.builder.group({
                    address: [],
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

            //#region ส่วนของ ข้อมูลครอบครัว
            req_family: this.builder.group({
                father_status: ["ยังมีชีวิตอยู่"],
                father: this.builder.group({
                    full_name: [],
                    id_card: [],
                    age: [],
                    education: [],
                    school: [],
                    career: this.builder.group({
                        name: [],
                        level_1: [],
                        level_2: [],
                        income: []
                    }),
                    address: this.builder.group({
                        address: [],
                        province: [],
                        district: [],
                        sub_district: [],
                        postcode: [],
                        telephone: []
                    })
                }),
                mother_status: ["ยังมีชีวิตอยู่"],
                mother: this.builder.group({
                    full_name: [],
                    id_card: [],
                    age: [],
                    education: [],
                    school: [],
                    career: this.builder.group({
                        name: [],
                        level_1: [],
                        level_2: [],
                        income: []
                    }),
                    address: this.builder.group({
                        address: [],
                        province: [],
                        district: [],
                        sub_district: [],
                        postcode: [],
                        telephone: []
                    })
                }),
                father_and_mother_marry_status: [],
                parent_status: ["No"],
                parent: this.builder.group({
                    full_name: [],
                    id_card: [],
                    age: [],
                    education: [],
                    school: [],
                    career: this.builder.group({
                        name: [],
                        level_1: [],
                        level_2: [],
                        income: []
                    }),
                    address: this.builder.group({
                        address: [],
                        province: [],
                        district: [],
                        sub_district: [],
                        postcode: [],
                        telephone: []
                    })
                }),
                total_sibling: [],
                total_brother: [],
                total_sister: [],
                self_sibling: [],
                sibling_studies: this.builder.array([]),
                sibling_works: this.builder.array([]),
                spouse_status: ["No"],
                spouse: this.builder.group({
                    full_name: [],
                    id_card: [],
                    age: [],
                    education: [],
                    school: [],
                    career: this.builder.group({
                        name: [],
                        level_1: [],
                        level_2: [],
                        income: []
                    }),
                    address: this.builder.group({
                        address: [],
                        province: [],
                        district: [],
                        sub_district: [],
                        postcode: [],
                        telephone: []
                    })
                })
            })
            //#endregion
        });
    }
}
