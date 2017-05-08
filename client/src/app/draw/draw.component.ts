import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {
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

    constructor() { }

    ngOnInit() {
        this.ctx = this.canvasRef.nativeElement.getContext('2d');
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
        return this.canvasRef.nativeElement.offsetLeft + this.containerRef.nativeElement.offsetLeft;
    }

    getOffsetTop(): number {
        return this.canvasRef.nativeElement.offsetTop + this.containerRef.nativeElement.offsetTop + this.titleRef.nativeElement.offsetHeight;
    }

    exportImage() {
        let data_url = this.canvasRef.nativeElement.toDataURL();

        console.log(data_url);
    }
}
