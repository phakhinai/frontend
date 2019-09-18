import { FormGroup } from '@angular/forms';

export interface IRegisterComponent {
    Url: any;
    form: FormGroup;
    onSubmit(): void;
}

export interface IRegister {
    idcard: string;
    titlename: string;
    firstname: string;
    lastname: string;
    studentcode: string;
    email: string;
}
