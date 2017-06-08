export default class CanvasImage {
    id: number;
    draw: boolean = false;
    x: number;
    y: number;
    color: string;
    url: string;
    img: any;
    width: number;
    height: number;
    radius: number;

    constructor(id: number, posX: number, posY: number, url: string, width?: number, height?: number) {
        this.id = id;
        this.x = posX;
        this.y = posY;
        this.width = width || 300;
        this.height = height || 150;
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