export class Board {
  constructor(boardWidth) {
    this.length = boardWidth;
    this.cells = [];
  }

  createCells() {
    for (let i = 0; i < 9; i++) {
      let row = [];

      for (let j = 0; j < 9; j++) {
        row.push(
          new Cell(i, j)
        );
      } 
      
      this.cells.push(row);
    }
  }
}

class Cell {
  constructor(xCoordinate, yCoordinate) {
    this.x = xCoordinate;
    this.y = yCoordinate;
    this.value = 0;
    this.htmlElement = document.createElement("div");
    
    this.#createHtmlElement();
  }

  #createHtmlElement() {
    this.htmlElement.id = `${this.x}-${this.y}`;
    this.htmlElement.classList.add('cell');
    this.htmlElement.textContent = this.value;

    $('#sudoku-board').append(this.htmlElement);
  }

  getHtmlElement() {
    return this.htmlElement;
  }
}