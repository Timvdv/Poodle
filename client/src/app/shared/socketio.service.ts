import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import * as io from 'socket.io-client';

@Injectable()
export class SocketioService {
    socket: any;

    constructor() {
        this.createSocket();
    }

    createSocket() {
        console.log("Connecting to: ", environment.socket_server);
        this.socket = io(environment.socket_server);

        console.log("socket");

        this.socket.on('connect', function (msg) {
            console.log('connected to socket!', msg);
        });
    }

    getSocket() {
        return this.socket;
    }
}