
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUser } from '../Entities/login-user';
import { RegisterUser} from '../Entities/register-user';
import { UserInformation } from '../Entities/user-information';



@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    UserUrl: string = "http://localhost:54058/api/account";
    TokenUrl:string = "http://localhost:54058/token"

    GetUsers() {
        return this.http.get(this.UserUrl + "/getproducts");
    }
    DeleteUser(user: LoginUser) {
        var newDeletedUser = { UserName: user.UserName, Password: user.Password };
        return this.http.post(this.UserUrl + "/deleteuser", newDeletedUser);
    }
    AddUser(user: RegisterUser) {
        var newUser = {UserName: user.UserName, Email:user.Email, Password: user.Password,
                       ConfirmPassword: user.ConfirmPassword };
        return this.http.post(this.UserUrl + "/Register", newUser);
    }
    UpdateUser(user: UserInformation) {
        var newUpdateUser = { FirstName: user.FirstName, LastName: user.LastName,
                                Age:user.Age, Gender: user.Gender, PhoneNumber: user.PhoneNumber};
        return this.http.post(this.UserUrl + "/updateuser", newUpdateUser);
    }
    LoginUser(user:LoginUser){
        //var loginUser = { grant_type: 'password', username: user.UserName, password: user.Password };
        let body = new URLSearchParams();
        body.set('grant_type', 'password');
        body.set('username', user.UserName);
        body.set('password', user.Password);

        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        
        return this.http.post(this.TokenUrl, body.toString(), options);
    }
}