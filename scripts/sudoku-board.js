import { Cell } from "./cell.js";

export class Board {
  constructor(boardWidth) {
    this.length = boardWidth;
    this.cells = [];
  }

  /**
   * Creates cells from array
   * @param {number[][]} sudokuArray - Sudoku board as a 2D array. 0 should be used in place of nulls
   */
  createCellsFromArray(sudokuArray) {
    this.clearBoard();

    this.cells = Array.from({ length: 9}, (_, i) => 
      Array.from({ length: 9 }, (_, j) => {
        const cell = new Cell(i, j, sudokuArray[i][j]);
        cell.createHtmlElement(j === 2 || j === 5, i === 2 || i === 5);
        return cell;
      })
    );
  }

  clearBoard() {
    this.cells = [];
    $('#sudoku-board').empty();
  }
}
