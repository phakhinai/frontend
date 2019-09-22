import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    constructor(
        private http: HttpService
    ) { }
}
