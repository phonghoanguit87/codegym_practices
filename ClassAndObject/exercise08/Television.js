class Television {
    constructor(status, chanel, volume) {
        this.status = status;
        this.chanel = chanel;
        this.volume = volume;
        this.chanelList = [];
        this.audio = new Audio('./music.mp3');
    }

    increaseChanel() {
        this.chanel += 1;
    }

    reduceChanel() {
        this.chanel -= 1;
    }

    increaseVolume() {
        this.volume += 0.1;
        this.audio.volume = this.volume;
    }

    reduceVolume() {
        this.volume -= 0.1;
        this.audio.volume = this.volume;
    }

    turnOn() {
        this.status = true;
        this.audio.volume = this.volume;
        this.audio.play();
    }

    turnOff() {
        this.status = false;
        document.getElementById("monitor").innerHTML = "";
        this.audio.pause();
    }

    display() {
        for(let i = 1; i <= CHANEL_NUMBER; i++) {
            let imgElement = '<img class="img" src="./images/' + i + '.jpeg">';
            this.chanelList.push(imgElement);
        }
        document.getElementById("monitor").innerHTML = this.chanelList[this.chanel];
    }
}