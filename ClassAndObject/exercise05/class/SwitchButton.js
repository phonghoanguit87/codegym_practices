class SwitchButton {
    constructor(status) {
        this.status = status;
    }

    connectToLamp(electricLamp) {
        this.lamp = electricLamp;
    }

    switchOff() {
        this.status = false;
    }

    switchOn() {
        this.status = true;
    }

    getStatus() {
        return this.status;
    }
}