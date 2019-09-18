import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IRegister } from '../pages/register/register.interface';
import { ILogin } from '../pages/login/login.interface';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(
        private httpClient: HttpClient
    ) { }

    private address: string = 'http://localhost:3000/api/account'

    /** Service สำหรับเข้าสู่ระบบ */
    onLogin(model: ILogin) {
        return new Promise((res, rej) => {
            res(model);
        });
    }

    /** Service สำหรับสมัครสมาชิก */
    // onRegister(model: IRegister) {
    //     return new Promise((res, rej) => {
    //         res(model);
    //     });
    // }

    /** Service สำหรับสมัครสมาชิก */
    onRegister(value: IRegister) {
        return new Observable<IRegister>(observ => {

            const model: IMember = {
                ID_CARD: value.idcard,
                TITLE_NAME: value.titlename,
                FIRST_NAME: value.firstname,
                LAST_NAME: value.lastname,
                CODE: value.studentcode,
                EMAIL: value.email
            }

            this.httpClient
                .post(`${this.address}/register`, model)
                .subscribe(
                    res => observ.next(),
                    err => observ.error(err)
                );
        });
    }
}

export interface IMember {
    ID_CARD: string;
    TITLE_NAME: string;
    FIRST_NAME: string;
    LAST_NAME: string;
    CODE: string;
    EMAIL: string;
}
