class ElectricLamp {
    constructor(status) {
        this.status = status;
    }

    turnOff() {
        this.status = false;
    }

    turnOn() {
        this.status = true;
    }

    getStatus() {
        return this.status;
    }
}