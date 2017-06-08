import { Component, OnInit } from '@angular/core';
import { SocketioService } from '../shared/socketio.service';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css']
})
export class WaitingComponent implements OnInit {
    socket: any;
    timer: 30;

    constructor(
        private socketService: SocketioService,
    ) { }

    ngOnInit() {
        this.socket = this.socketService.getSocket();

        this.socket.on('timer', (data) => {
            this.timer = data.timeLeft;
        });
  }

}
