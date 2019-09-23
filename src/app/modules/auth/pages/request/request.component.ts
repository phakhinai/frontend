import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { AppURL } from 'src/app/app.url';
import { IAccount } from 'src/app/services/account.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.css']
})

export class RequestComponent implements OnInit {

    constructor(
        private builder: FormBuilder,
        private _formBuilder: FormBuilder
    ) {
        this.createFormData();
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

    /** สร้างฟอร๋มทั้งหมด */
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
                        add_no: [],
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
                        add_no: [],
                        province: [],
                        district: [],
                        sub_district: [],
                        postcode: [],
                        telephone: []
                    })
                }),
                marry_status: [],
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
                        add_no: [],
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
                        add_no: [],
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
