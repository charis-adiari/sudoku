import { Cell } from "./cell.js";

export class Board {
  constructor(boardWidth) {
    this.length = boardWidth;
    this.cells = [];
  }

  /**
   * Creates cells from array
   * @param {[][]} sudokuArray - Sudoku board as an array consisiting of 9 arrays with 9 numbers each. 0 should be used in place of nulls
   */
  createCellsFromArray(sudokuArray) {
    this.clearBoard();

    for (let i = 0; i < 9; i++) {
      let row = [];

      for (let j = 0; j < 9; j++) {
        const cell = new Cell(i, j, sudokuArray[i][j]);
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
