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
    }

    updateRGB(newR, newG, newB) {
        console.log("worked");
        this.r = newR;
        this.g = newG;
        this.b = newB;
        this.build();
    }

}