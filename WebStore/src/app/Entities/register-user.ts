export class RegisterUser{
    UserName:string;
    Email:string;
    Password:string;
    ConfirmPassword:string;
   
    constructor(userName:string, email:string, password:string, confirmpassword:string) {   
      this.UserName = userName;
      this.Email = email;
      this.Password = password;
      this.ConfirmPassword = confirmpassword;
    }
  }