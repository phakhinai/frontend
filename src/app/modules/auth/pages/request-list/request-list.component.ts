import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from '../../auth.url';
import { AlertService } from 'src/app/shared/services/alert.service';
import { RequestService } from '../../services/request.service';
import { IRequest, IRequests } from '../request/request.interface';

@Component({
    selector: 'app-request-list',
    templateUrl: './request-list.component.html',
    styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

    constructor(
        private alertService: AlertService,
        private requestService: RequestService
        ) { 
            this.initialLoadRequests();
        }

    ngOnInit() { }

    AppURL = AppURL;
    AuthURL = AuthURL;

    items: IRequest[];
    totalItem: number;

    /** กำหนดค่าที่มีอยู่แล้ว */
    private initialLoadRequests() {
        this.requestService
            .getRequests()
            .then(res => {
                this.items = res.items;
                this.totalItem = res.totalItem;
            })
            .catch(err => {
                this.alertService.notify(err.Message);
            });
    }

}
