export class Board {
  constructor(boardWidth) {
    this.length = boardWidth;
    this.cells = [];
  }

  createCells() {
    this.clearBoard();

    for (let i = 0; i < 9; i++) {
      let row = [];

      for (let j = 0; j < 9; j++) {
        const cell = new Cell(i, j);
        cell.createHtmlElement(j === 2 || j === 5, i === 2 || i === 5);
        row.push(cell);
      } 
      
      this.cells.push(row);
    }
  }

  clearBoard() {
    this.cells = [];
    $('#sudoku-board').empty();
  }
}

class Cell {
  constructor(xCoordinate, yCoordinate, value = 0) {
    this.x = xCoordinate;
    this.y = yCoordinate;
    this.value = value;
    this.htmlElement = document.createElement("div");
  }

  createHtmlElement(hasRightBorder = false, hasBottomBorder = false) {
    this.htmlElement.setAttribute('data-x-coordinate', this.x);
    this.htmlElement.setAttribute('data-y-coordinate', this.y);
    this.htmlElement.classList.add('cell');
    this.htmlElement.textContent = this.value;

    if (hasRightBorder) this.htmlElement.classList.add('right-border');
    if (hasBottomBorder) this.htmlElement.classList.add('bottom-border');

    $('#sudoku-board').append(this.htmlElement);
  }

  getHtmlElement() {
    return this.htmlElement;
  }
}