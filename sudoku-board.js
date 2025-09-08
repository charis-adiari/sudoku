export class Board {
  constructor(boardWidth) {
    this.length = boardWidth;
    console.log('Board length ' + this.length);
    this.cells = [];
  }

  setBoardSize() {
    // $('#sudoku-board').height(this.length);
    // $('#sudoku-board').width(this.length);
  }

  createCells() {
    for (let i = 0; i < 9; i++) {
      let row = [];

      for (let j = 0; j < 9; j++) {
        row.push(
          new Cell(this.length, i, j)
        );
      } 
      
      this.cells.push(row);
    }
  }
}

class Cell {
  constructor(gameLength, xCoordinate, yCoordinate) {
    // this.gameLength = gameLength;
    // this.length = (this.gameLength - 14) / 9;
    this.x = xCoordinate;
    this.y = yCoordinate;
    this.value = 0;
    this.htmlElement = document.createElement("div");
    
    this.#createHtmlElement();
  }

  #createHtmlElement() {
    this.htmlElement.id = `${this.x}-${this.y}`;
    // this.htmlElement.style.width = this.length + 'px';
    // this.htmlElement.style.height = this.length + 'px';
    this.htmlElement.classList.add('cell');
    this.htmlElement.textContent = this.value;

    $('#sudoku-board').append(this.htmlElement);
  }

  getHtmlElement() {
    return this.htmlElement;
  }
}