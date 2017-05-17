import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

class CanvasImage {
    draw: boolean = false;
    x: number;
    y: number;
    color: string;
    url: string;
    img: any;
    width: number;
    height: number;

    constructor(posX: number, posY: number, url: string) {
        this.x = posX;
        this.y = posY;
        this.width = 100;
        this.height = 100;
        this.color = "#FF0000";
        this.url = url;

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
        console.log("compare",hitX,hitY, "with",this.x,this.y );
        return(
            (hitX > this.x ) &&
            (hitX < this.x ) &&
            (hitY > this.y ) &&
            (hitY < this.y ));
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
    timer: number;

    images: CanvasImage[] = [];

    constructor(
        private http: Http,
    ) { }

    ngOnInit() {
      this.ctx = this.canvasRef.nativeElement.getContext('2d');

      this.images.push(
          new CanvasImage(20, 50, "assets/smiley-cool.gif")
      );

      this.images.push(
          new CanvasImage(20, 200, "assets/gallery-field-thumb.jpg")
      );

      // Vieze timeout sorry (╯°□°）╯︵ ┻━┻
      setTimeout( () => {
          this.drawImages();
      }, 200)

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
        if(this.drag){
            this.mousePos = this.getMousePos(event);
            this.addClick(event.pageX - this.getOffsetLeft(), event.pageY - this.getOffsetTop(), true);
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
            console.log("click:", this.mousePos.x, this.mousePos.y);
            if (this.images[i].hitTest(this.mousePos.x, this.mousePos.y)) {
                console.log("HIT!");
                this.draggingImage = true;
                this.dragIndex = i;
            }
        }

        if(this.draggingImage) {

            // window.addEventListener("mousemove", mouseMoveListener, false);

            //place currently dragged shape on top
            this.images.push(this.images.splice(this.dragIndex,1)[0]);

            //shapeto drag is now last one in array
            this.dragHoldX = this.mousePos.x - this.images[this.images.length-1].x;
            this.dragHoldY = this.mousePos.y - this.images[this.images.length-1].y;

            //The "target" position is where the object should be if it were to move there instantaneously. But we will
            //set up the code so that this target position is approached gradually, producing a smooth motion.
            this.targetX = this.mousePos.x - this.dragHoldX;
            this.targetY = this.mousePos.y - this.dragHoldY;

            //start timer
            // this.timer = setInterval(onTimerTick, 1000/30);
        }

        this.drawImages();
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
