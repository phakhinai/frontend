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
    req_titlename: string,
    req_firstname: string,
    req_lastname: string,
    req_birthdate: string,
    req_age: number,
    req_nationality: string,
    req_ethnicity: string,
    req_education_level: string,
    req_student_level: string,
    req_faculty: string,
    req_branch: string,
    req_program: string,
    req_grade: string,
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
    campus: string,
    amount: number
}
