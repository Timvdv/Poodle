import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NewGame {
    constructor (
        private http: Http
    ) {}

    getCode() {
        return this.http.get(`http://localhost:3000/newGame`)
            .map((res:Response) => res.json());
    }

}

