//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient

export default class GradientField {
    constructor(canvas, width, height, r, g, b) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d');

        this.r = r;
        this.g = g;
        this.b = b;

        this.circle = {
            x: width,
            y: 0,
            width: 5,
            height: 5
        }

        this.mouseDown = false;
        this.startEventListener();
    }

    getRGBString() {
        return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
    }

    draw() {
        this.build();
    }

    build() {
        let linGrad = this.ctx.createLinearGradient(0, 0, this.width, 0);
        linGrad.addColorStop(1, this.getRGBString());
        this.ctx.fillStyle = linGrad;
        this.ctx.fillRect(0, 0, this.width, this.height);


        linGrad = this.ctx.createLinearGradient(0, 0, this.width, 0);
        linGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
        linGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        this.ctx.fillStyle = linGrad;
        this.ctx.fillRect(0, 0, this.width, this.height);

        linGrad = this.ctx.createLinearGradient(0, this.height, 0, 0);
        linGrad.addColorStop(0, "rgba(0, 0, 0, 1)");
        linGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        this.ctx.fillStyle = linGrad;
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.beginPath();
        this.ctx.arc(this.circle.x - this.circle.width, this.circle.y + this.circle.height, this.circle.width, 0, 360 * (Math.PI / 180));
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.ctx.closePath();
    }

    updateRGB(newR, newG, newB) {
        console.log("worked");
        this.r = newR;
        this.g = newG;
        this.b = newB;
        this.build();
    }

    startEventListener() {
        this.canvas.addEventListener("mousedown", this.onMouseDown)
        this.canvas.addEventListener("mousemove", this.onMouseMove)
        document.addEventListener("mouseup", this.onMouseUp);
    }

    onMouseDown(e) {
        let cX = e.clientX - this.canvas.offsetLeft;
        let cY = e.clientY - this.canvas.offsetTop;

        if (
            cY > this.circle.y &&
            cY < this.circle.y + this.circle.width &&
            cX > this.circle.x &&
            cX < this.circle.width
        ) {
            this.mouseDown = true;
            console.log("moved")
        } else {
            this.circle.x = cX;
            this.circle.y = cY;
            console.log("clicked")
        }

    }

    onMouseMove(e) {
        if (this.mouseDown === true) {
            let cX = e.clientX - this.canvas.offsetLeft;
            let cY = e.clientY - this.canvas.offsetTop;
            this.circle.x = cX;
            this.circle.y = cY;
        }
    }

    onMouseUp() {
        this.mouseDown = false;
    }
}