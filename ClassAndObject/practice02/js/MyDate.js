class MyDate {
      constructor(day, month, year) {
            this.day = day;
            this.month = month;
            this.year = year;
      }

      setDay(day) {
            this.day  = day;
      }

      getDay() {
            return this.day;
      }

      setMonth(month) {
            this.month  = month;
      }

      getMonth() {
            return this.month;
      }

      setYear(year) {
            this.year  = year;
      }

      getYear() {
            return this.year;
      }

      setDate(day, month, year) {
            this.day = day;
            this.month = month;
            this.year = year;
      }

      toString() {
            return this.day + "/" + this.month + "/" + this.year;
      }
  }