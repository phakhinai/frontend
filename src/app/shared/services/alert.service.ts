import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(
        private toastr: ToastrService
    ) { }

    notify(
        message: string = 'เกิดข้อผิดพลาดกรุณาตรวจสอบข้อมูล',
        title: string = 'แจ้งเตือน',
        type: string = 'warning'
    ) {
        const obtions:Partial<IndividualConfig> = {
            timeOut: 3000,
            progressAnimation: 'increasing',
            progressBar: true,
        }
        switch (type) {
            case 'success': {
                this.toastr.success(message, title, obtions);
                break;
            }
            case 'info': {
                this.toastr.info(message, title, obtions);
                break;
            }
            case 'warning': {
                this.toastr.warning(message, title, obtions);
                break;
            }
            case 'error': {
                this.toastr.error(message, title), obtions;
                break;
            }
            default: {
                this.toastr.warning(message, title, obtions);
                break;
            }
        }
    }
}
