import { IAccount } from 'src/app/services/account.service';

export interface IAuthNavbarComponent {
    AppURL: any;
    AuthURL: any;
    
    userLogin: IAccount;
}