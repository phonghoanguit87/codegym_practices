class Mouse {
    constructor(name, weight, speed, status = true) {
        this.name = name;
        this.weight = weight;
        this.speed = speed;
        this.status = status;
        this.x = Math.floor(Math.random() * DEFAULT_ROWS);
        this.y = Math.floor(Math.random() * DEFAULT_COLS);
    }

    getName() {
        return this.name;
    }

    getStatus() {
        return this.status;
    }

    setStatus(value) {
        this.status = value;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    getWeight() {
        return this.weight;
    }

    call() {
        let audio = new Audio('./sounds/chuot-keu.mp4');
        audio.play();
    }

    showMessage(message, clear = false) {
        let content = "";
        if(!clear) {
            let oldContent = document.getElementById("message").innerHTML;
            content = oldContent + "<br>" + this.name + ": " + message;
        } else {
            content = this.name + ": " + message;
        }
        
        document.getElementById("message").innerHTML = content;
    }

    createCellHtml() {
        let top = this.x * DEFAULT_CELL_SIZE;
        let left = this.y * DEFAULT_CELL_SIZE;
        let cellHtml = '<div id="cell-' + this.x + '-' + this.y +'" class="cell" style="left:'+ left + 'px; top:' + top +'px;"></div>';
            
        return cellHtml;
    }

    draw() {
        let mouse = new Image();
        mouse.src = './images/mouse.png';
        let cellCtx = document.getElementById("cell-" + this.x + "-" + this.y).getContext("2d");


        mouse.onload = function () {
            cellCtx.drawImage(mouse, 10, 0, 268, 150);
        };
    }

    clear() {
        let cellCtx = document.getElementById("cell-" + this.x + "-" + this.y).getContext("2d");

        cellCtx.clearRect(0, 0, 300, 300);
    }
}