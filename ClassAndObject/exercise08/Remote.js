class Remote {
    constructor(code, chanel, volume) {
        this.code = code;
        this.chanel = chanel;
        this.volume = volume;
    }

    connectToTelevison(television) {
        this.television = television;
        this.chanel = television.chanel;
        this.volume = television.volume;
        this.television.display();
    }

    increaseChanel() {
        this.chanel += 1;
        this.television.increaseChanel();
        this.television.display();
    }

    reduceChanel() {
        this.chanel -= 1;
        this.television.reduceChanel();
        this.television.display();
    }

    increaseVolume() {
        if(this.volume + 0.1 <= 1) {
            console.log(this.volume);
            this.volume += 0.1;
            this.television.increaseVolume();
        }
    }

    reduceVolume() {
        if(this.volume - 0.1 >= 0) {
            this.volume -= 0.1;
            this.television.reduceVolume();
        }
    }
}