import { Cell } from "./cell.js";

export class Board {
  constructor(boardWidth) {
    this.length = boardWidth;
    this.cells = [];

    $('#sudoku-board').on('click', (e) => this.#handleClick(e));
  }

  /**
   * Creates cells from array
   * @param {number[][]} sudokuArray - Sudoku board as a 2D array. 0 should be used in place of nulls
   */
  createCellsFromArray(sudokuArray) {
    this.#clearBoard();

    this.cells = Array.from({ length: 9 }, (_, i) =>
      Array.from({ length: 9 }, (_, j) => {
        const cell = new Cell(i, j, sudokuArray[i][j]);
        cell.createHtmlElement(j === 2 || j === 5, i === 2 || i === 5);
        return cell;
      })
    );
  }

  #handleClick(event) {
    const htmlElement = event.target.closest('.cell');

    if (!htmlElement) {
      console.error('Couldn\'t find closest cell');
      return;
    }

    const row = parseInt(htmlElement.dataset.xCoordinate);
    const col = parseInt(htmlElement.dataset.yCoordinate);
    this.#selectCell(this.cells[row][col]);
  }

  #selectCell(cell) {
    $('.cell').removeClass('selected-highlight').removeClass('secondary-highlight');

    cell.htmlElement.classList.add('selected-highlight');

    this.#highlightRow(cell.row, cell.column, ['secondary-highlight']);
    this.#highlightColumn(cell.row, cell.column, ['secondary-highlight']);
    this.#highlightBlock(cell.row, cell.column, ['secondary-highlight']);
  }

  /**
   * Applies CSS classes to all cells in a specific row except the selected cell
   * @param {number} row - Index of row
   * @param {number} col - Index of column
   * @param {string[]} classes - Classes to be applied
   */
  #highlightRow(row, col, classes) {
    for (let i = 0; i < 9; i++) {
      if (i === col) continue;

      this.cells[row][i].htmlElement.classList.add(...classes)
    }
  }

  /**
   * Applies CSS classes to all cells in a specific column except the selected cell
   * @param {number} row - Index of row
   * @param {number} col - Index of column
   * @param {string[]} classes - Classes to be applied
   */
  #highlightColumn(row, col, classes) {
    for (let i = 0; i < 9; i++) {
      if (i === row) continue;

      this.cells[i][col].htmlElement.classList.add(...classes)
    }
  }

  /**
   * Applies CSS classes to all cells in a specific block except the selected cell
   * @param {number} row - Index of row
   * @param {number} col - Index of column
   * @param {string[]} classes - Classes to be applied
   */
  #highlightBlock(row, col, classes) {
    const blockStart = this.#getBlockStart(row, col);
    const blockEndRow = blockStart.row + 3;
    const blockEndCol = blockStart.col + 3;

    for (let i = blockStart.row; i < blockEndRow; i++) {
      for (let j = blockStart.col; j < blockEndCol; j++) {
        if (i === row && j === col) continue;
        
        this.cells[i][j].htmlElement.classList.add(...classes)
      }
    }
  }

  #getBlockStart(row, col) {
    const blockSize = 3;
    const blockStartRow = Math.floor(row / blockSize) * blockSize;
    const blockStartCol = Math.floor(col / blockSize) * blockSize;

    return { row: blockStartRow, col: blockStartCol };
  }

  #clearBoard() {
    this.cells = [];
    $('#sudoku-board').empty();
  }
}
