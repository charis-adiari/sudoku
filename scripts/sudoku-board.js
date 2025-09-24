import { Cell } from "./cell.js";

export class Board {
  constructor(boardWidth) {
    this.length = boardWidth;
    this.cells = [];
    this.selectedCell = null;
    this.isValid = true;

    $('#sudoku-board').on('click', (e) => this.#handleClick(e));
  }

  /**
   * Creates cells from array
   * @param {number[][]} sudokuArray - Sudoku board as a 2D array. 0 should be used in place of nulls
   * @returns {number[]} An array with the total number of times a number appears on the board
   */
  createCellsFromArray(sudokuArray) {
    this.#clearBoard();
    const valueCounts = new Array(9).fill(0);

    this.cells = Array.from({ length: 9 }, (_, i) =>
      Array.from({ length: 9 }, (_, j) => {
        const value = sudokuArray[i][j];

        if (value > 0) ++valueCounts[value - 1];
        
        const cell = new Cell(i, j, value);
        cell.createHtmlElement(j === 2 || j === 5, i === 2 || i === 5);
        return cell;
      })
    );

    return valueCounts;
  }

  /**
   * Saves a reference to the currently selected cell and adds highlights
   * @param {number} row - Row index of current cell
   * @param {number} col - Column index of current cell
   */
  setSelectedCell(row, col) {
    this.selectedCell = this.cells[row][col];
    this.#highlightCells();
  }

  /**
   * Sets the value of currently selected cell
   * @param {number} newValue 
   */
  setCellValue(newValue) {    
    this.selectedCell.setValue(newValue);
    this.setSelectedCell(this.selectedCell.row, this.selectedCell.column);
  }
  
  /**
   * Erases value of currently selected cell
   */
  eraseCell() {
    this.selectedCell.erase();
    this.setSelectedCell(this.selectedCell.row, this.selectedCell.column);
  }

  /**
   * Removes all highlights from all cells
   */
  removeAllHighlights() {
    $('.cell').removeClass('selected-highlight secondary-highlight same-value-highlight');
  }

  #clearBoard() {
    this.cells = [];
    $('#sudoku-board').empty();
  }

  #handleClick(event) {
    const htmlElement = event.target.closest('.cell');

    if (!htmlElement) {
      console.error('Couldn\'t find closest cell');
      return;
    }

    const row = parseInt(htmlElement.dataset.xCoordinate);
    const col = parseInt(htmlElement.dataset.yCoordinate);
    this.setSelectedCell(row, col);
  }
  
  /**
   * Applies CSS classes to the selected cell, all cells in the same row, column and block, and cells with the same value 
   */
  #highlightCells() {
    this.removeAllHighlights();
    
    this.selectedCell.htmlElement.classList.add('selected-highlight');
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const currentCell = this.cells[row][col];

        if (row === this.selectedCell.row && col === this.selectedCell.column) continue;

        if (this.selectedCell.value !== 0 && this.selectedCell.value === currentCell.value)
          currentCell.htmlElement.classList.add(['same-value-highlight']);
        else if (this.#inSameBlock(this.selectedCell.row, this.selectedCell.column, row, col))
          currentCell.htmlElement.classList.add(['secondary-highlight']);
        else if (row === this.selectedCell.row) 
          currentCell.htmlElement.classList.add(['secondary-highlight']);
        else if (col === this.selectedCell.column) 
          currentCell.htmlElement.classList.add(['secondary-highlight']);
      }
      
    }
  }

  /**
   * Checks if 2 cells are in the same block
   * @param {number} row1 Row index of the first cell 
   * @param {number} col1 Column index of the first cell
   * @param {number} row2 Row index of the second cell
   * @param {number} col2 Column index of the second cell
   * @returns {boolean} Whether or not the 2 cells are in the same block
   */
  #inSameBlock(row1, col1, row2, col2) {
    const block1Row = Math.floor(row1 / 3);
    const block1Col = Math.floor(col1 / 3);
    const block2Row = Math.floor(row2 / 3);
    const block2Col = Math.floor(col2 / 3);

    return block1Row === block2Row && block1Col === block2Col;
  }
}
