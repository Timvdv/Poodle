import {Component, OnInit} from '@angular/core';
import {NewGameService} from '../shared/new-game.service';
import { Router } from '@angular/router';
import { SocketioService } from '../shared/socketio.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    constructor(
        private newGameService: NewGameService,
        private router: Router,
        private socketService: SocketioService
    ) {}

    socket: any;

    error: string = "";
    code: string = "";
    playerName: string = "";
    gameData: any = {};

    ngOnInit() {
        this.socket = this.socketService.getSocket();

        this.socket.on('gameStarted', (player_id) => {
            // GREAAAT SUCCESS (met borat stem)
            this.router.navigate( ['/tekenen'] );
        });
    }

    enterCode(event) {
        this.code = event;
    }

    enterName(event) {
        this.playerName = event;
    }

    startGame(event) {
        this.socket.emit('startGame', this.code);
    }

    submitCode(event) {
        this.error = "";

        this.newGameService.validateCode(this.code, this.playerName).then( (data) => {
            console.log(data);

            if(data.systemResponse == "Player was allowed to join.") {
                this.gameData = data.addedPlayer;

                this.identify(this.gameData);
            } else {
                this.error = data.response;
            }

        })
    }

    identify(data) {
        this.socket.emit('identifyGame', data.id);
    }

    isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }

        return JSON.stringify(obj) === JSON.stringify({});
    }
}
