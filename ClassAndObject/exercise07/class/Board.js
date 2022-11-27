class Board {
    constructor(rows, cols, elementId, cat, mouse) {
        this.rows = rows;
        this.cols = cols;
        this.elementId = elementId;
        this.turn = VALUE_C;
        this.cells = [];
        this.isOver = false;
        this.cat = cat;
        this.mouse = mouse;
    }
    
    setCat(cat) {
        this.cat = cat;
    }

    getCat() {
        return this.cat;
    }

    setMouse(mouse) {
        this.mouse = mouse;
    }

    getMouse() {
        return this.mouse;
    }

    draw() {
        let gameBoardDiv = document.getElementById(this.elementId);
        gameBoardDiv.innerHTML = "";

        for(let i = 0; i < this.rows; i++){
            let row = [];
            this.cells.push(row);
            for(let j = 0; j < this.cols; j++){
                let cell = new Cell(i, j);
                row.push(cell);
                gameBoardDiv.innerHTML += cell.getCellHtml();
            }
        }

        if(this.cat != null) {
            let cell = this.cells[this.cat.x][this.cat.y];
            cell.value = VALUE_C;
            this.cat.draw();
        }

        if(this.mouse != null) {
            let cell = this.cells[this.mouse.x][this.mouse.y];
            cell.value = VALUE_M;
            this.mouse.draw();
        }
    }

    play(x, y) {
        let cell = this.cells[x][y];
        if(cell.value === VALUE_EMPTY || cell.value === VALUE_M) {           
            if(this.cat.x !== x && this.cat.y !== y) {
                this.cat.showMessage("I can't go to here!", true);
            }

            if(this.cat.x === x && this.cat.y + this.cat.speed >= y || this.cat.y === y && this.cat.x + this.cat.speed >= x) {
                if(this.mouse.x === x && this.mouse.y === y) {
                    this.cat.eatMouse(this.mouse);
                    this.mouse.setStatus(false);
                    this.mouse.showMessage("I was died", true);
                    this.mouse.clear();
                    this.cat.showMessage("I eatten the mouse", false);
                    this.cat.clear();
                    this.cat.setPosition(x, y);
                    this.cat.draw();
                    cell.value = VALUE_C;

                    this.isOver = true;
                    alert("You won!!!");
                } else {
                    this.cat.clear();
                    this.cells[this.cat.x][this.cat.y].value = VALUE_EMPTY;
                    this.cat.setPosition(x, y);
                    this.cat.draw();
                    cell.value = VALUE_C;
                    this.cat.showMessage("I go to here, where's the mouse?", true);
                }
            } else {
                this.cat.showMessage("I can't go to here!", true);
            }

            if(this.mouse.status) {
                let moveCells = this.findAvailableCells(this.mouse);
                let maxDistance = 0;
                let moveCell;
                for(let i = 0; i < moveCells.length; i++) {
                    let distance = Math.sqrt(Math.pow(moveCells[i].x - this.cat.x, 2) + Math.pow(moveCells[i].y - this.cat.y, 2));
                    if(distance > maxDistance) {
                        maxDistance = distance;
                        moveCell = moveCells[i];
                    }
                }

                this.mouse.clear();
                this.cells[this.mouse.x][this.mouse.y].value = VALUE_EMPTY;
                this.mouse.setPosition(moveCell.x, moveCell.y);
                this.mouse.draw();
                moveCell.value = VALUE_M;
                this.mouse.showMessage("I doesn't catch me \(-.-)/", false);
            }
        } else {
            if(cell.value === VALUE_C) {
                this.cat.call();
            } else {
                this.mouse.call();
            }
        }
    };

    over(x, y) {
        if(this.isOver) {
            return;
        }

        let cell = this.cells[x][y];
        if(cell.value === VALUE_C) {
            let moveCells = this.findAvailableCells(this.cat);
            for(let i = 0; i < moveCells.length; i++) {
                let cell = document.getElementById("cell-" + moveCells[i].x + "-" + moveCells[i].y);
                cell.classList.add("available_cell");
            }
        }
    }

    out(x, y) {
        if(this.isOver) {
            return;
        }

        let cell = this.cells[x][y];
        if(cell.value === VALUE_C) {
            let moveCells = this.findAvailableCells(this.cat);
            for(let i = 0; i < moveCells.length; i++) {
                let cell = document.getElementById("cell-" + moveCells[i].x + "-" + moveCells[i].y);
                cell.classList.remove("available_cell");
            }
        }
    }

    findAvailableCells(object) {
        console.log(object);
        console.log(this.cells);
        let moveCells = [];

        if(object.x === DEFAULT_ROWS - 1) {
            for(let i = object.x - 1; i >= object.x - object.speed && i >= 0; i--) {
                moveCells.push(this.cells[i][object.y]);
            }
        } else if(object.x === 0) {
            for(let i = 1; i <= object.speed && i <= DEFAULT_ROWS - 1; i++) {
                moveCells.push(this.cells[i][object.y]);
            }
        } else {
            for(let i = object.x + 1; i <= object.x + object.speed && i <= DEFAULT_ROWS - 1; i++) {
                moveCells.push(this.cells[i][object.y]);
            }

            for(let i = object.x - 1; i >= object.x - object.speed && i >= 0; i--) {
                moveCells.push(this.cells[i][object.y]);
            }
        }

        if(object.y === DEFAULT_COLS - 1) {
            for(let i = object.y - 1; i >= object.y - object.speed; i--) {
                moveCells.push(this.cells[object.x][i]);
            }
        } else if(object.y === 0) {
            for(let i = 1; i <= object.speed; i++) {
                moveCells.push(this.cells[object.x][i]);
            }
        } else {
            for(let i = object.y + 1; i <= object.y + object.speed && i <= DEFAULT_COLS - 1; i++) {
                moveCells.push(this.cells[object.x][i]);
            }

            for(let i = object.y - 1; i >= object.y - object.speed && i >= 0; i--) {
                moveCells.push(this.cells[object.x][i]);
            }
        }

        return moveCells;
    }
}