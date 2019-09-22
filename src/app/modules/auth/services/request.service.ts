import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { IRequest } from '../pages/request/request.interface';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    constructor(
        private http: HttpService
    ) { }

    /** Service สำหรับบันทึกข้อมูลรายการขอกู้ */
    createRequest(model: IRequest) {
        return this.http
            .requestPost('api/request', model)
            .toPromise() as Promise<IRequest>;
    }
}
