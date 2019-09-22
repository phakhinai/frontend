import { Injectable } from '@angular/core';
import { IRegister } from '../pages/register/register.interface';
import { ILogin } from '../pages/login/login.interface';
import { HttpService } from '../shared/services/http.service';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(
        private http: HttpService
    ) { }

    /** Service สำหรับดึงข้อมูลผู้ใช้งานจาก Access Token */
    getUserLogin(accessToken: string) {
        return this.http
            .requestGet('api/member/login', accessToken)
            .toPromise() as Promise<IAccount>;
    }

    /** Service สำหรับเข้าสู่ระบบ */
    onLogin(model: ILogin) {
        return this.http
            .requestPost('api/account/login', model)
            .toPromise() as Promise<{ accessToken: string }>;
    }

    /** Service สำหรับสมัครสมาชิก */
    onRegister(model: IRegister) {
        return this.http
            .requestPost('api/account/register', model)
            .toPromise() as Promise<IAccount>;
    }
}

export interface IAccount {
    idcard: string;
    titlename: string;
    firstname: string;
    lastname: string;
    studentcode: string;
    email: string;

    id?: any;
    created?: Date;
    updated?: Date;
}
