class Temperature {
    constructor(celsius) {
        this.celsius = celsius;
    }

    toKelvin() {
        return (this.celsius + 273.15);
    }

    toFahrenheit() {
        return (this.celsius * 1.8) + 32;
    }
}