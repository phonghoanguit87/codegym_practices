const VALUE_EMPTY = 1;
const VALUE_X = 2;
const VALUE_O = 3;
const DEFAULT_CELL_SIZE = 40;

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.value = VALUE_EMPTY;
    }
    
    getCellHtml() {
        let top = this.x * DEFAULT_CELL_SIZE;
        let left = this.y * DEFAULT_CELL_SIZE;
        let cellHtml = '<div id="cell-' + this.x + '-' + this.y +'" onclick="play(' + this.x + ',' + this.y + ')" class="cell" style="left:'+ left + 'px; top:' + top +'px;"></div>';
        
        return cellHtml;
    }
    
    draw() {
        let cellDiv = document.getElementById("cell-" + this.x + "-" + this.y);
        console.log("x, y, value, :", this.x, this.y, this.value);
        switch (this.value){
            case VALUE_X:
                cellDiv.innerHTML = "X";
                cellDiv.classList.add("X");
                break;

            case VALUE_O:
                cellDiv.innerHTML = "O";
                cellDiv.classList.add("O");
                break;

            default:
                cellDiv.innerHTML = "";
                break;
        }
    }
}