import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Injectable()
// ng g service shared/naam-hier -> naamHierService
// bij aanmaken van een nieuwe component niet vergeten de routing aan te passen
export class NewGameService {

    playerName: string = "";
    constructor(private http:Http) {
    }

    getCode() {
        return this.http.get(environment.server_path + '/newGame')
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    validateCode(code, playerName?) {
        if(playerName) {
            this.playerName = playerName;
        }

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(environment.server_path + '/join', {
            "name": this.playerName,
            "image": "to be developed",
            "gameId": code
        }, options )
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res:Response) {
        let body = res.json();

        return body || {};
    }

    private handleError(error:Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg:string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log("eroorroror");
        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}
