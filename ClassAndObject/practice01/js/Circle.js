class Circle {
    constructor(radius, color) {
      this.radius = radius;
      this.color = color;
    }

    getRadius() {
        return this.radius;
    }

    getArea() {
        return Math.PI * this.radius * this.radius;
    }
  };