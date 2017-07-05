import { Component, OnInit } from '@angular/core';
import { NewGameService } from '../shared/new-game.service';
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
    name: string;
    joined: boolean = false;

    error: string = "";
    code: string = "";
    playerName: string = "";
    gameData: any = {};

    ngOnInit() {
        this.socket = this.socketService.getSocket();

        this.socket.on('gameStarted', (player_id) => {
            console.log('game started! Lets go.')
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

    startGame() {

        this.socket.emit('startGame', this.code);

    }

    submitCode(event) {
        this.error = "";

        if(!this.joined) {
            this.newGameService.validateCode(this.code, this.playerName).then( (data) => {

                if(data.systemResponse == "Player was allowed to join.") {
                    this.gameData = data.addedPlayer;

                    this.joined = true;

                    this.identify(this.gameData);
                } else {
                    console.log(data);
                    this.error = data.systemResponse;
                }

            });
        }
    }

    identify(data) {
        // Save game to localstorage
        localStorage.setItem('gameCode', this.code);
        localStorage.setItem('playerId', data.id);

        this.socket.emit('identifyGame', data.id, this.code);
    }

    isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }

        return JSON.stringify(obj) === JSON.stringify({});
    }
}
