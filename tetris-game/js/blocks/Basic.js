class Basic {
    constructor(row, col, angle = 0) {
        this.row = row
        this.col = col
        this.angle = angle
    }
    
    get shape() {
        return this.constructor.shapes[this.angle]
    }
    
    get width() {
        return this.shape[0].length
    }
    
    get height() {
        return this.shape.length
    }
    
    fall() {
        this.row += 1
    }
    
    rotate() {
        if (this.angle < 3) {
            this.angle += 1
        } else {
            this.angle = 0
        }
    }
    
    move(direction) {
        if (direction === 'left') {
            this.col -= 1
        } else if (direction === 'right') {
            this.col += 1
        }
    }
}