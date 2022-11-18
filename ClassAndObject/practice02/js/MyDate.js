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
            let result = "";

            if(this.day < 10) {
                  result += "0" + this.day + "/";
            } else {
                  result += this.day + "/";
            }

            if(this.month < 10) {
                  result += "0" + this.month + "/";
            } else {
                  result += this.month + "/";
            }

            return result + this.year;
      }
  }