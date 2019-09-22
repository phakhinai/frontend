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

    //#region ส่วนของที่อยู่
    req_perm_adddress: string,
    req_perm_province: string,
    req_perm_district: string,
    req_perm_sub_district: string,
    req_perm_postcode: string,
    req_perm_telephone: string,
    req_pres_adddress: string,
    req_pres_province: string,
    req_pres_district: string,
    req_pres_sub_district: string,
    req_pres_postcode: string,
    req_pres_telephone: string,
    //#endregion

    //#region ส่วนของผู้อุปการะด้านการเงิน
    req_sup_name?: string,
    req_sup_relation?: string,
    req_sup_amount?: number,
    //#endregion

    //#region ส่วนของประวัติการศึกษา
    req_grad_status: string,
    req_grad_from?: string,
    req_grad_faculty?: string,
    req_grad_branch?: string,
    //#endregion

    //#region ส่วนของทุนการศึกษา
    req_fund_status: string,
    req_funds?: IFund[],
    //#endregion

    //#region ส่วนของกองทุนเงินให้กู้ยืมเพื่อการศึกษา
    req_borr_status: string,
    req_borrows?: IBorrow[]
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
