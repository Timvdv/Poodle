import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {NewGameService} from '../shared/new-game.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    constructor(private newGame:NewGameService) {
    }

    game = {
        code: ""
    };

    loadCode() {
        this.newGame.getCode().then((data) => {
            this.game.code = data.gameId;
        });
    }


    ngOnInit() {
    this.loadCode();
    }

}
