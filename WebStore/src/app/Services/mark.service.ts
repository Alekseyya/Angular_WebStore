import { Mark } from '../Entities/mark';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MarkService {

    constructor(private http: HttpClient) { }

    MarksUrl: string = "http://localhost:54058/api/mark";

    GetMarks() {
        return this.http.get(this.MarksUrl + "/getmarks");
    }
    DeleteMark(mark: Mark) {
        var newDeletedMark = { Name: mark.Name };
        return this.http.post(this.MarksUrl + "/deletemark", newDeletedMark);
    }
    AddMark(mark: Mark) {
        var newMark = { Name: mark.Name};
        return this.http.post(this.MarksUrl + "/addmark", newMark);
    }
    UpdateMark(mark: Mark) {
        var newUpdateMark = { Name: mark.Name};
        return this.http.post(this.MarksUrl + "/updatemark", newUpdateMark);
    }
}