import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    AppURL = AppURL;

}
