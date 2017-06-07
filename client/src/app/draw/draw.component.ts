import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SocketioService } from '../shared/socketio.service';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import {platform} from "os";

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {
    socket: any;

    @ViewChild('drawCanvas') canvasRef: ElementRef;
    ctx: CanvasRenderingContext2D;

    @ViewChild('container') containerRef: ElementRef;
    @ViewChild('title') titleRef: ElementRef;

    stageWidth: number = 500;
    stageHeight: number = 300;
    color: string = "#ff7e00";

    clickX: any[] = [];
    clickY: any[] = [];
    clickDrag: any[] = [];
    paint: boolean = false;

    doodle_name: string = "";

    constructor(
        private http: Http,
        private socketService: SocketioService
    ) {
        this.socket = socketService.getSocket();
    }

    ngOnInit() {
        this.ctx = this.canvasRef.nativeElement.getContext('2d');

        const playerId = localStorage.getItem('playerId') || '';
        const gameCode = localStorage.getItem('gameCode') || '';
        console.log('playerid : ' + playerId);
        console.log('code : ' + gameCode)
        this.socket.emit('getDoodle', playerId, gameCode);

        this.socket.on('setDoodle', (data) => {
           console.log('doodle naam = ' + data.doodleName);
           this.doodle_name = data.doodleName;
        });
    }

    @HostListener('document:mouseup')
    onMouseUp() {
        this.paint = false;
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event) {
        console.log(this.canvasRef)
        var mouseX = event.pageX - this.getOffsetLeft();
        var mouseY = event.pageY - this.getOffsetTop();

        this.paint = true;
        this.addClick(event.pageX - this.getOffsetLeft(), event.pageY - this.getOffsetTop());
        this.redraw();
    }

    @HostListener('mousemove', ['$event'])
    changePixel(event) {
        if(this.paint){
            this.addClick(event.pageX - this.getOffsetLeft(), event.pageY - this.getOffsetTop(), true);
            this.redraw();
        }
    }

    addClick(x, y, dragging?)
    {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); // Clears the canvas

        this.ctx.strokeStyle = "#df4b26";
        this.ctx.lineJoin = "round";
        this.ctx.lineWidth = 5;

        for(var i=0; i < this.clickX.length; i++) {
            this.ctx.beginPath();
            if(this.clickDrag[i] && i){
                this.ctx.moveTo(this.clickX[i-1], this.clickY[i-1]);
            }else{
                this.ctx.moveTo(this.clickX[i]-1, this.clickY[i]);
            }
            this.ctx.lineTo(this.clickX[i], this.clickY[i]);
            this.ctx.closePath();
            this.ctx.stroke();
        }
    }

    getOffsetLeft(): number {
        return this.canvasRef.nativeElement.getBoundingClientRect().left;
    }

    getOffsetTop(): number {
        return this.canvasRef.nativeElement.getBoundingClientRect().top;
    }

    exportImage() {
        let data_url = this.canvasRef.nativeElement.toDataURL(),
            headers = new Headers({ 'Content-Type': 'application/json' }),
            options = new RequestOptions({ headers: headers });

        let playerId = localStorage.getItem('playerId') || "";
        let gameCode = localStorage.getItem('gameCode') || "";

        return this.http.post(environment.server_path + "/doodle", {
            playerId: playerId,
            gameId: gameCode,
            doodle: data_url
        }, options)
                   .toPromise()
                   .then(this.extractData)
                   .then(this.sendImageResponse)
                   .catch(this.handleError);
    }

    sendImageResponse(data) {
        if(data) {
            console.log(data);
        }
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.success || { };
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;

        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}
