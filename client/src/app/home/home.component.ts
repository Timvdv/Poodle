import {Component, OnInit} from '@angular/core';
import {NewGameService} from '../shared/new-game.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    constructor(
        private newGameService: NewGameService,
        private router: Router,
    ) {}

    error: string = "";
    code: string = "";
    playerName: string = "";

    enterCode(event) {
        this.code = event;
    }

    enterName(event) {
        this.playerName = event;
    }

    submitCode(event) {
        this.error = "";

        this.newGameService.validateCode(this.code, this.playerName).then( (data) => {

            console.log(data.response);

            if(data.response == "Player was allowed to join.") {
                // GREAAAT SUCCESS (met borat stem)
                this.router.navigate(['/tekenen'])
            } else {
                this.error = data.response;
            }

        })
    }

    ngOnInit() {
        console.log('component is geladen')
    }
}
