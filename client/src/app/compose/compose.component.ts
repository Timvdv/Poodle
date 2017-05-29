import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

import { SocketioService } from '../shared/socketio.service';

class CanvasImage {
    draw: boolean = false;
    x: number;
    y: number;
    color: string;
    url: string;
    img: any;
    width: number;
    height: number;
    radius: number;

    constructor(posX: number, posY: number, url: string) {
        this.x = posX;
        this.y = posY;
        this.width = 100;
        this.height = 100;
        this.url = url;
        this.radius = 100;

        this.loadImage(url);
    }

    loadImage(imgPath) {
        let img = new Image();

        img.onload =  () => {
            this.draw = true;
            this.img = img;
        }

        img.src = imgPath;
    }

    hitTest(hitX,hitY) {
        let dx = this.x - hitX;
        let dy = this.y - hitY;

        return(dx*dx + dy*dy < this.radius*this.radius);
    }

    drawToContext(theContext) {
        if(this.draw) {
            theContext.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
};

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {
    socket: any;

    @ViewChild('drawCanvas') canvasRef: ElementRef;
    ctx: CanvasRenderingContext2D;

    @ViewChild('container') containerRef: ElementRef;
    @ViewChild('title') titleRef: ElementRef;

    stageWidth: number = 1000;
    stageHeight: number = 1000;
    color: string = "#ff7e00";

    clickX: any[] = [];
    clickY: any[] = [];
    clickDrag: any[] = [];
    drag: boolean = false;
    draggingImage: boolean = false;
    dragIndex: number = 1;
    mousePos: {x,y} = {x: 0, y: 0};
    dragHoldX: number;
    dragHoldY: number;
    targetX: number;
    targetY: number;
    timer: any;

    images: CanvasImage[] = [];

    constructor(
        private http: Http,
        private socketService: SocketioService
    ) {
        this.socket = socketService.getSocket();
    }

    ngOnInit() {
        this.ctx = this.canvasRef.nativeElement.getContext('2d');

        // Vieze timeout sorry (╯°□°）╯︵ ┻━┻
        setTimeout( () => {
            this.drawImages();
        }, 200);

        if(this.socket) {

            this.socket.on('init', (msg) => {
                this.socket.emit('test');
            });

            this.socket.on('setImages', (data) => {
                console.log("emit ding");
                console.log(data);
                if(data) {
                    for (var i = 0; i < data.length; ++i) {
                        let image = data[i];

                        this.images.push(
                            new CanvasImage( image.x, image.y, image.url )
                        );
                    }
                }
            });

        } else {
            console.error('No socket connection :(');
        }
    }

    drawImages() {
        if(this.images) {
            for (var i = 0; i < this.images.length; ++i) {
                this.images[i].drawToContext(this.ctx);
            }
        }
    }

    @HostListener('document:mouseup')
    onMouseUp() {
        this.drag = false;
        this.draggingImage = false;
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event) {
        var mouseX = event.pageX - this.getOffsetLeft();
        var mouseY = event.pageY - this.getOffsetTop();

        this.drag = true;
        this.addClick(event.pageX - this.getOffsetLeft(), event.pageY - this.getOffsetTop());
        this.redraw();
    }

    @HostListener('mousemove', ['$event'])
    changePixel(event) {
        if(!this.images.length) {
            console.error('no images');
            return;
        }

        if(this.drag){
            this.mousePos = this.getMousePos(event);
            this.addClick(event.pageX - this.getOffsetLeft(), event.pageY - this.getOffsetTop(), true);

            var posX;
            var posY;
            var shapeRad = this.images[this.images.length-1].radius;
            var minX = shapeRad;
            var maxX = this.stageWidth - shapeRad;
            var minY = shapeRad;
            var maxY = this.stageHeight - shapeRad;

            let mousePos = this.getMousePos(event);

            //clamp x and y positions to prevent object from dragging outside of canvas
            posX = mousePos.x - this.dragHoldX;
            posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
            posY = mousePos.y - this.dragHoldY;
            posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);

            this.targetX = posX;
            this.targetY = posY;

            this.redraw();
        }
    }

    addClick(x, y, dragging?) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); // Clears the canvas

        this.ctx.strokeStyle = "#df4b26";
        this.ctx.lineJoin = "round";
        this.ctx.lineWidth = 5;

        for (let i=0; i < this.images.length; i++) {
            if (this.images[i].hitTest(this.mousePos.x, this.mousePos.y)) {
                console.log("HIT!", this.images[i].url);
                this.draggingImage = true;
                this.dragIndex = i;
            }
        }

        if(this.draggingImage) {

            // window.addEventListener("mousemove", mouseMoveListener, false);

            //place currently dragged shape on top
            this.images.push(
                this.images.splice(this.dragIndex,1)[0]
            );

            //shapeto drag is now last one in array
            this.dragHoldX = this.mousePos.x - this.images[this.images.length-1].x;
            this.dragHoldY = this.mousePos.y - this.images[this.images.length-1].y;

            //The "target" position is where the object should be if it were to move there instantaneously. But we will
            //set up the code so that this target position is approached gradually, producing a smooth motion.
            this.targetX = this.mousePos.x - this.dragHoldX;
            this.targetY = this.mousePos.y - this.dragHoldY;

            this.images[this.images.length-1].x = this.mousePos.x - (this.images[this.images.length-1].width / 2);
            this.images[this.images.length-1].y = this.mousePos.y - (this.images[this.images.length-1].height / 2);

            //start timer
            //this.timer = setInterval(_ => this.onTimerTick, 1000/30)
        }

        this.drawImages();
    }

    onTimerTick() {
        let easeAmount = 300;

        //because of reordering, the dragging shape is the last one in the array.
        this.images[this.images.length-1].x = this.images[this.images.length-1].x + 1*(this.targetX - this.images[this.images.length-1].x);
        this.images[this.images.length-1].y = this.images[this.images.length-1].y + 1*(this.targetY - this.images[this.images.length-1].y);

        //stop the timer when the target position is reached (close enough)
        if (
            (!this.draggingImage)
            &&(Math.abs(this.images[this.images.length-1].x - this.targetX) < 0.1) &&
            (Math.abs(this.images[this.images.length-1].y - this.targetY) < 0.1)) {

            this.images[this.images.length-1].x = this.targetX;
            this.images[this.images.length-1].y = this.targetY;

            clearInterval(this.timer);
        }

        this.redraw();
    }

    done() {
        console.log('lala');
    }

    getOffsetLeft(): number {
        return this.canvasRef.nativeElement.getBoundingClientRect().left;
    }

    getOffsetTop(): number {
        return this.canvasRef.nativeElement.getBoundingClientRect().top;
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.success || { };
    }


    getMousePos(event) {
        const rect = this.canvasRef.nativeElement.getBoundingClientRect();
        return {
            x: (event.clientX - rect.left) || (event.changedTouches && event.changedTouches[0].clientX - rect.left),
            y: (event.clientY - rect.top) || (event.changedTouches && event.changedTouches[0].clientY - rect.top)
        };
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
