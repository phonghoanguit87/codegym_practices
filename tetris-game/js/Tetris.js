class Tetris {
    constructor() {
        this.score = 0;
        this.boardWidth = 10;
        this.boardHeight = 23;
        this.currentBoard = new Array(this.boardHeight).fill(0).map(() => new Array(this.boardWidth).fill(0));
        this.landedBoard = new Array(this.boardHeight).fill(0).map(() => new Array(this.boardWidth).fill(0));
        this.currentTetromino = this.randomTetromino();
        this.tempTetromino = this.randomTetromino();
        this.canvas = document.getElementById('tetris-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.gameInterval = null;
        this.isPlay = false;
        this.isPause = false;
        this.isMusic = false;
        this.backgroundMusic = new Audio("sounds/backgroun_music.mp3");
        this.sound = null;
        this.gameOver = false;
    }

    getPlayStatus() {
        return this.isPlay;
    }

    setPlayStatus(value) {
        this.isPlay = value;
    }

    getPauseStatus() {
        return this.isPause;
    }

    setPauseStatus(value) {
        this.isPause = value;
    }

    getMusic() {
        return this.isMusic;
    }

    setMusic(value) {
        this.isMusic = value;
    }
    
    draw(blockSize = 28, padding = 2) {
        this.saveHightCore();
        /* Vẽ khung của board */
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.lineWidth = 2;
        this.ctx.rect(padding, padding, blockSize * this.boardWidth + padding * (this.boardWidth + 1), blockSize * (this.boardHeight - 3) + padding * (this.boardHeight - 3 + 1));
        this.ctx.stroke();
        
        /* Lặp qua các phần tử của mảng board và vẽ các block tại đúng vị trí */
        if(this.isPlay) {
            for (let i = 3; i < this.boardHeight; i++) {
                for (let j = 0; j < this.boardWidth; j++) {
                    if (this.currentBoard[i][j] > 0) {
                        this.ctx.fillStyle = this.getColor(this.currentBoard[i][j]);
                    } else {
                        this.ctx.fillStyle = 'rgb(248, 248, 248)';
                    }
                    this.ctx.fillRect(padding * 2 + j * (blockSize + padding), padding * 2 + (i - 3) * (blockSize + padding), blockSize, blockSize);
                }
            }
        } else {
            for (let i = 3; i < this.boardHeight; i++) {
                for (let j = 0; j < this.boardWidth; j++) {
                    this.ctx.fillStyle = 'rgb(248, 248, 248)';
                    this.ctx.fillRect(padding * 2 + j * (blockSize + padding), padding * 2 + (i - 3) * (blockSize + padding), blockSize, blockSize);
                }
            }
        }

        
        /* Viết ra các đoạn text */
        this.ctx.fillStyle = 'rgb(0, 0, 0)';
        this.ctx.font = '12px serif';
        this.ctx.fillText('NEXT:', 310, 28);
        this.ctx.fillText('POINT:', 310, 200);
        this.ctx.fillText(this.score.toString(), 310, 220);
        this.ctx.fillText('HIGHT POINT:', 310, 300);
        this.ctx.fillText(this.getHightScore().toString(), 310, 320);

        if(this.isGameOver()) {
            this.ctx.font = '30px serif';
            this.ctx.fillText('GAME OVER!', 60, 312);
        }
    }

    drawNext(blockSize = 20, padding = 2) {
        const nextX = 310, nextY = 35;
        const nextWidth = 4, nextHeight = 4;

        /* Vẽ khung của next board */
        let width = blockSize * nextWidth + padding * (nextWidth + 1);
        let height = blockSize * (nextHeight) + padding * (nextHeight + 1);
        this.ctx.closePath();
        this.ctx.clearRect(nextX, nextY, width, height);
        this.ctx.rect(nextX + padding, nextY + padding, width, height);
        this.ctx.stroke();

        let nextBoard = new Array(nextHeight).fill(0).map(() => new Array(nextWidth).fill(0));
        for (let i = 0; i < this.tempTetromino.height; i++) {
            for (let j = 0; j < this.tempTetromino.width; j++) {
                if (this.tempTetromino.shape[i][j] > 0) {
                    if(this.isPlay){
                        nextBoard[i][j] = this.tempTetromino.shape[i][j]
                    }
                }
            }
        }

        /* Lặp qua các phần tử của mảng next board và vẽ các block tại đúng vị trí */
        for (let i = 0; i < nextHeight; i++) {
            for (let j = 0; j < nextWidth; j++) {
                if (nextBoard[i][j] > 0) {
                    this.ctx.fillStyle = this.getColor(nextBoard[i][j]);
                } else {
                    this.ctx.fillStyle = 'rgb(248, 248, 248)';
                }

                this.ctx.fillRect(nextX + padding * 2 + j * (blockSize + padding), nextY + padding * 2 + (i) * (blockSize + padding), blockSize, blockSize);
            }
        }
    }
    
    getColor(cellNumber) {
        switch (cellNumber) {
            case 1:
                return L.color
            case 2:
                return J.color
            case 3:
                return O.color
            case 4:
                return T.color
            case 5:
                return S.color
            case 6:
                return Z.color
            case 7:
                return I.color
        }
    }
    
    randomTetromino() {
        const randNum = Math.floor(Math.random() * Math.floor(7))
        switch (randNum) {
            case 0:
                return new L(1, 4)
            case 1:
                return new J(1, 4)
            case 2:
                return new O(2, 4)
            case 3:
                return new T(2, 4)
            case 4:
                return new S(2, 4)
            case 5:
                return new Z(2, 4)
            case 6:
                return new I(0, 4)
        }
    }
    
    play() {
        this.gameInterval = setInterval(() => {
            if(this.isPlay) {
                if(!this.isPause) {
                    this.progress();
                    this.updateCurrentBoard();
                    this.draw();
                    this.drawNext();
                }
            }
        }, 600);
    }
    
    progress() {
        let nextTetromino = new this.currentTetromino.constructor(this.currentTetromino.row + 1, this.currentTetromino.col, this.currentTetromino.angle)
        if (!this.bottomOverlapped(nextTetromino) && !this.landedOverlapped(nextTetromino)) {
            this.currentTetromino.fall()
        } else {
            this.mergeCurrentTetromino()
            
            const clearableRowIndexes = this.findClearableRows()
            this.clearRows(clearableRowIndexes)
            this.score += this.calculateScore(clearableRowIndexes.length)

            if (this.isGameOver()) {
                if(this.score >= this.getHightScore()) {
                    this.sound = new Audio("sounds/win.mp3");
                    this.sound.play();
                } else {
                    this.sound = new Audio("sounds/lost.mp3");
                    this.sound.play();
                }
                clearInterval(this.gameInterval)
                this.gameOver = true
            }
            
            this.currentTetromino = this.tempTetromino;
            this.tempTetromino = this.randomTetromino();
        }
    }

    leftOverlapped(tetromino) {
        if (tetromino.col < 0) {
            return true
        } else {
            return false
        }
    }
    
    rightOverlapped(tetromino) {
        if (tetromino.col + tetromino.width > this.boardWidth) {
            return true
        } else {
            return false
        }
    }
    
    bottomOverlapped(tetromino) {
        if (tetromino.row + tetromino.height > this.boardHeight) {
            return true
        } else {
            return false
        }
    }
    
    landedOverlapped(tetromino) {
        for (let i = 0; i < tetromino.height; i++) {
            for (let j = 0; j < tetromino.width; j++) {
                if (tetromino.shape[i][j] > 0 &&
                    this.landedBoard[tetromino.row + i][tetromino.col + j] > 0) {
                    return true
                }
            }
        }
        return false
    }
    
    mergeCurrentTetromino() {
        for (let i = 0; i < this.currentTetromino.height; i++) {
            for (let j = 0; j < this.currentTetromino.width; j++) {
                if (this.currentTetromino.shape[i][j] > 0) {
                    this.landedBoard[this.currentTetromino.row + i][this.currentTetromino.col + j] = this.currentTetromino.shape[i][j]
                }
            }
        }
    }
    
    tryMoveDown() {
        if (this.gameOver) {
            return;
        }
        
        this.progress();
        this.updateCurrentBoard();
        this.draw();
        this.drawNext();
    }
    
    tryMoveLeft() {
        if (this.gameOver) {
            return;
        }
        
        const tempTetromino = new this.currentTetromino.constructor(this.currentTetromino.row, this.currentTetromino.col - 1, this.currentTetromino.angle)
        if (!this.leftOverlapped(tempTetromino) && !this.landedOverlapped(tempTetromino)) {
            this.currentTetromino.col -= 1;
            this.updateCurrentBoard();
            this.draw();
            this.drawNext();
        }
    }
    
    tryMoveRight() {
        if (this.gameOver) {
            return;
        }
        
        const tempTetromino = new this.currentTetromino.constructor(this.currentTetromino.row, this.currentTetromino.col + 1, this.currentTetromino.angle)
        if (!this.rightOverlapped(tempTetromino) && !this.landedOverlapped(tempTetromino)) {
            this.currentTetromino.col += 1;
            this.updateCurrentBoard();
            this.draw();
            this.drawNext();
        }
    }
    
    tryRotating() {
        if (this.gameOver) {
            return;
        }
        
        const tempTetromino = new this.currentTetromino.constructor(this.currentTetromino.row + 1, this.currentTetromino.col, this.currentTetromino.angle)
        tempTetromino.rotate()
        if (!this.rightOverlapped(tempTetromino) &&
            !this.bottomOverlapped(tempTetromino) &&
            !this.landedOverlapped(tempTetromino)) {
            this.currentTetromino.rotate()
            this.updateCurrentBoard()
            this.draw()
            this.drawNext()
        }
    }
    
    updateCurrentBoard() {
        for (let i = 0; i < this.boardHeight; i++) {
            for (let j = 0; j < this.boardWidth; j++) {
                this.currentBoard[i][j] = this.landedBoard[i][j]
            }
        }
        
        for (let i = 0; i < this.currentTetromino.height; i++) {
            for (let j = 0; j < this.currentTetromino.width; j++) {
                if (this.currentTetromino.shape[i][j] > 0) {
                    this.currentBoard[this.currentTetromino.row + i][this.currentTetromino.col + j] = this.currentTetromino.shape[i][j]
                }
            }
        }
    }
    
    findClearableRows() {
        const clearableIndexes = []
        
        this.landedBoard.forEach((row, index) => {
            if (row.every(cell => cell > 0)) {
                clearableIndexes.push(index)
            }
        })
        
        return clearableIndexes
    }
    
    clearRows(rowIndexes) {
        for (let i = this.landedBoard.length - 1; i>=0; i--) {
            for (let j = 0; j < rowIndexes.length; j++) {
                if (rowIndexes[j] === i) {
                    this.landedBoard.splice(rowIndexes[j], 1)
                }
            }
        }
        
        for (let i = 0; i < rowIndexes.length; i++) {
            this.sound = new Audio("sounds/score_goals.mp3");
            this.sound.play();
            this.landedBoard.unshift(new Array(this.boardWidth).fill(0))
        }
    }
    
    calculateScore(rowsCount) {
        return (rowsCount * (rowsCount + 1)) / 2
    }

    saveHightCore() {
        let hightCore = localStorage.getItem("hightCore");

        if(hightCore === null) {
            localStorage.setItem("hightCore", this.score);
        } else {
            if(this.score > hightCore) {
                localStorage.setItem("hightCore", this.score);
            }
        }
    }
    
    getHightScore() {
        let hightCore = localStorage.getItem("hightCore");
        if(hightCore === null) {
            return 0;
        } else {
            return hightCore;
        }
    }

    turnOnSound() {
        if(this.isMusic) {
            this.backgroundMusic.play();
        } else {
            this.backgroundMusic.pause();
        }
        
    }

    reset() {
        this.currentBoard = new Array(this.boardHeight).fill(0).map(() => new Array(this.boardWidth).fill(0));
        this.landedBoard = new Array(this.boardHeight).fill(0).map(() => new Array(this.boardWidth).fill(0));
        this.isPlay = false;
        this.gameOver = false;
        this.draw();
        this.drawNext();
        clearInterval(this.gameInterval)
    }
    
    isGameOver() {
        for (let i = 0; i < this.boardWidth; i++) {
            if (this.landedBoard[2][i] > 0) {
                return true
            }
        }
        
        return false
    }
}