import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { NewGameService } from '../shared/new-game.service';
import { environment } from '../../environments/environment';

import { SocketioService } from '../shared/socketio.service';
import CanvasImage from '../shared/CanvasImage';

enum DisplayState {
    NEWGAME,
    INPROGRESS,
    COMPOSE,
    LOADING,
}

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
    socket: any;

    state: DisplayState = DisplayState.NEWGAME;
    DisplayState = DisplayState;

    @ViewChild('composeCanvas') canvasRef: ElementRef;
    ctx: CanvasRenderingContext2D;

    stageWidth: number = 1000;
    stageHeight: number = 500;

    images: CanvasImage[] = [];

    players = []

    constructor(
        private newGame:NewGameService,
        private socketService: SocketioService
    ) {
        this.socket = socketService.getSocket();
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
        this.ctx = this.canvasRef.nativeElement.getContext('2d');

        // Load the gamecode
        this.loadCode();

        //Setup the socket listeners
        if(this.socket) {
            this.socket.on('positionChangeImages', (images) => {
                this.drawImages(images);
            });

            this.socket.on('playerJoined', (data) => {
                this.players.push({
                    gameId: data.gameId,
                    playerId: data.playerId,
                    playerName: data.playerName
                })
            });

            this.socket.on('gameStarted', (data) => {
                this.state = DisplayState.INPROGRESS;
            });

            this.socket.on('composePhase', (data) => {
                this.state = DisplayState.COMPOSE;
            });

        }
    }

    drawImages(images) {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        if(images) {

            for (var i = 0; i < images.length; ++i) {

                let index = this.findIndexInData(this.images, 'id', images[i].id);

                if(index != -1) {
                    this.images[index].x = images[i].x;
                    this.images[index].y = images[i].y;

                    this.images[index].drawToContext(this.ctx);
                } else {
                    const newCanvasImage = new CanvasImage( images[i].id, images[i].x, images[i].y, environment.server_path + "/assets/" + images[i].url );

                    this.images.push(newCanvasImage);

                    newCanvasImage.drawToContext(this.ctx);
                }
            }
        }
    }

    findIndexInData(data, property, value) {
      for(var i = 0, l = data.length ; i < l ; i++) {
        if(data[i][property] === value) {
          return i;
        }
      }
      return -1;
    }

    changeState() {
         this.state = DisplayState.COMPOSE;
    }
}



