import {Component, OnInit} from '@angular/core';
import {NewGameService} from '../shared/new-game.service';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

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



