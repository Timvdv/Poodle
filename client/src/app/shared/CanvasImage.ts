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

    constructor(id: number, posX: number, posY: number, url: string) {
        this.id = id;
        this.x = posX;
        this.y = posY;
        this.width = 100;
        this.height = 100;
        this.url = url;
        this.radius = 100;

        console.log(url);

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