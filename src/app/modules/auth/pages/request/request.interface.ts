import { FormGroup } from '@angular/forms';

export interface IRequestComponent {
    Url: any;
    form: FormGroup;
    onSubmit(): void;
}

export interface IRequest {
    //#region ประเภทการกู้
    req_year: string,
    req_campus: string,
    req_type: string,
    req_loanmem: string,
    req_loanproved: string,
    req_study_fee: boolean,
    req_study_relate: boolean,
    req_study_live: boolean,
    //#endregion

    //#region ส่วนของข้อมูลส่วนตัว
    req_member: {
        titlename: string,
        firstname: string,
        lastname: string,
        birthdate: string,
        age: number,
        nationality: string,
        ethnicity: string,
        education_level: string,
        student_level: string,
        faculty: string,
        branch: string,
        program: string,
        grade: string,
        support: {
            name: string
            relation: string
            amount: number
        },
        add_permanent: {
            adddress: string
            province: string
            district: string
            sub_district: string
            postcode: string
            telephone: string
        },
        add_present: {
            adddress: string
            province: string
            district: string
            sub_district: string
            postcode: string
            telephone: string
        },
        graduated: string,
        graduate: {
            academy: string
            faculty: string
            branch: string
        },
        funded: string,
        funds: Array<IFund>,

        borrowed: string,
        borrows: Array<IFund>,
    }
    //#endregion
}

export interface IFund {
    year: string,
    type: string,
    name: string,
    amount: number
}

export interface IBorrow {
    year: string,
    educ_level: string,
    stud_level: string,
    campus: string
    amount: number
}
