import {Component, OnInit} from '@angular/core';
import {NewGameService} from '../shared/new-game.service';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    constructor(private newGameService: NewGameService) {
    }

    code: string = "";
    playerName: string = "";

    enterCode(event) {
        this.code = event;
    }

    enterName(event) {
        this.playerName = event;
    }

    submitCode(event) {
        this.newGameService.validateCode(this.code, this.playerName);
    }

    ngOnInit() {
        console.log('component is geladen')
    }
}
