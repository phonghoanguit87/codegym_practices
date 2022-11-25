class Supper {
    constructor(imgPath, x, y) {
        this.imgPath = imgPath;
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        let supperImg = new Image();
        supperImg.src = this.imgPath;

        supperImg.onload = function () {
            ctx.drawImage(supperImg, this.x, this.y);
        };
    }
}