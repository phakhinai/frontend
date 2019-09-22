import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from '../../auth.url';

@Component({
    selector: 'app-request-list',
    templateUrl: './request-list.component.html',
    styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

    constructor() { }

    ngOnInit() { }

    AppURL = AppURL;
    AuthURL = AuthURL;

}
