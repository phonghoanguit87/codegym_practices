class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    };

    setWidth(width) {
        this.width = width;
    };

    getPerimeter() {
        return (this.height + this.width) * 2;
    }

    getArea() {
        return this.height * this.width;
    }

    draw(ctx, x, y) {
        ctx.beginPath();
        ctx.fillStyle='#fa4b2a';
        ctx.fillRect(x, y, this.width, this.height);
    }

    clear(ctx, x, y) {
        ctx.clearRect(x, y, this.width, this.height);
    }
}