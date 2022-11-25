class Apple {
    constructor(weigth = 10) {
        this.weigth = weigth;
    }

    decrease() {
        this.weigth -= 1;
    }

    isEmpty() {
        return this.weigth > 0;
    }

    getWeight() {
        return this.weigth;
    }
}