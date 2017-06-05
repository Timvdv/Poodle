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

        console.log('component is geladen')

        this.socket.on('gameReady', (player_id) => {
            console.log('yaya');

            // GREAAAT SUCCESS (met borat stem)
            this.router.navigate(['/tekenen'])
        });
    }

    enterCode(event) {
        this.code = event;
    }

    enterName(event) {
        this.playerName = event;
    }

    startGame(event) {
        this.socket.emit('gameStarted', this.gameData.addedPlayer.game);
    }

    submitCode(event) {
        this.error = "";

        this.newGameService.validateCode(this.code, this.playerName).then( (data) => {
            console.log(data.response);

            if(data.response == "Player was allowed to join.") {
                this.gameData = data.response;

                this.identify(this.gameData);
            } else {
                this.error = data.response;
            }

        })
    }

    identify(data) {
        let player_id = data.addedPlayer.id;
        this.socket.emit('identifyGame', player_id);
    }

    isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }

        return JSON.stringify(obj) === JSON.stringify({});
    }
}
