import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {
    @ViewChild('myCanvas') canvasRef: ElementRef;
    ctx: CanvasRenderingContext2D;

    stageWidth: number = 400;
    stageHeight: number = 400;
    color: string = "#ff7e00";

    constructor() { }

    ngOnInit() {
    }

    @HostListener('document:mouseup')
    onMouseUp() {
        console.log("mouseup");
    }

    @HostListener('mousemove', ['$event'])
    changePixel(event) {
        console.log(event);
    }
}
