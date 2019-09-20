import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthenService {

    constructor() { }

    private accessKey = 'ssKey';

    /** กำหนดค่า Access token ไว้ในตวามจำ browser */
    setAuthenticated(accessToken: string): void {
        localStorage.setItem(this.accessKey, accessToken);
    }

    /** ดึงค่า Access token ในความจำ browser ออกมา */
    getAuthenticated(): string {
        return localStorage.getItem(this.accessKey)
    }

    /** ลบค่า Access token ที่อยู่ในความจำ browser */
    clearAuthenticated(): void {
        localStorage.removeItem(this.accessKey);
    }
}
