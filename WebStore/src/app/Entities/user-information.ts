export class UserInformation {
    FirstName: string;
    LastName: string;
    Age: number;
    Gender: string;
    PhoneNumber: string;

    constructor(firstName: string, lastName: string, age: number, gender: string, phoneNumber: string) {
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Age = age;
        this.Gender = gender;
        this.PhoneNumber = phoneNumber;

    }
}