class Human {
    constructor(name, gender, weight) {
        this.name = name;
        this.gender = gender;
        this.weight = weight;
    }

    isMale() {
        return this.gender;
    }

    setGender(value) {
        this.gender = value;
    }

    checkApple(apple) {
        let hasApple = apple.isEmpty();
        return hasApple;
    }

    eatApple(apple) {
        apple.decrease();
        return apple;
    }

    say(message) {
        console.log(message);
    }

    getName() {
        return this.name;
    }

    setName(value) {
        this.name = value;
    }

    getWeight() {
        return this.weight;
    }

    setWeight(value) {
        this.weight = value;
    }
}