import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Picture } from '../Entities/picture';

@Injectable()
export class PictureService {

    constructor(private http: HttpClient) { }

    PictureUrl: string = "http://localhost:54058/api/picture";

    GetPictures() {
        return this.http.get(this.PictureUrl + "/getpictures");
    }
}