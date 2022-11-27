const DEFAULT_COLS = 10;
const DEFAULT_ROWS = 10;
const DEFAULT_CELL_SIZE = 40;
const VALUE_EMPTY = 0;
const VALUE_C = 1;
const VALUE_M = 2;

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.value = VALUE_EMPTY;
    }
    
    getCellHtml() {
        let top = this.x * DEFAULT_CELL_SIZE;
        let left = this.y * DEFAULT_CELL_SIZE;
        let cellHtml = '<canvas id="cell-' + this.x + '-' + this.y + '" onclick="onClickCell(' + this.x + ',' + this.y + ')" onmouseover="cellOver(' + this.x + ',' + this.y + ')" onmouseout="cellOut(' + this.x + ',' + this.y + ')" class="cell" style="left:'+ left + 'px; top:' + top + 'px;"></canvas>';
        
        return cellHtml;
    }
}