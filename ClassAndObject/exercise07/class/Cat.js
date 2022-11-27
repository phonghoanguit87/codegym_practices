class Cat {
    constructor(name, weight, speed, status = true) {
        this.name = name;
        this.weight = weight;
        this.speed = speed;
        this.status = status;
        this.x = 0;
        this.y = 0;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    call() {
        let audio = new Audio('./sounds/meo-keu.mp4');
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

    findMouse() {
        //let cell = document.getElementById("cell-" + this.x + "-" + this.y);
        //cell.mouse = 'onclick="onClickCell(' + this.x + ',' + this.y + ')"';
    }

    eatMouse(mouse) {
        if(mouse.getStatus() == true) {
            this.weight += mouse.getWeight();
        }
    }

    draw() {
        let cat = new Image();
        cat.src = './images/cat.png';
        let cellCtx = document.getElementById("cell-" + this.x + "-" + this.y).getContext("2d");


        cat.onload = function () {
            cellCtx.drawImage(cat, 10, 0, 268, 150);
        };
    }

    clear() {
        let cellCtx = document.getElementById("cell-" + this.x + "-" + this.y).getContext("2d");

        cellCtx.clearRect(0, 0, 300, 300);
    }
}