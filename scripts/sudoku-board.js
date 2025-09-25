import { Cell } from "./cell.js";

export class Board {
  constructor() {
    /**
     * 2D array of all the cells in the board
     * @type {Cell[]}
     */
    this.cells = [];
    /**
     * Represents the cell that is currently selected
     * @type {Cell | null}
     */
    this.selectedCell = null;
    /**
     * Stores whether or not all the cells on the board have valid values
     * @type {boolean}
     */
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
    this.#checkRow(newValue);
    this.#checkColumn(newValue);
    this.#checkBox(newValue);
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

  /**
   * If the cell doesn't contain a note with that number, the note is added. Otherwise, the note is removed
   * @param {number} noteValue - The number that should be in the note (1 - 9)
   */
  toggleNote(noteValue) {
    if (this.selectedCell.notes.includes(noteValue)) this.selectedCell.removeNote(noteValue);
    else this.selectedCell.addNote(noteValue);
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
   * Applies CSS classes to the selected cell, all cells in the same row, column and box, and cells with the same value 
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
        else if (this.#inSameBox(this.selectedCell.row, this.selectedCell.column, row, col))
          currentCell.htmlElement.classList.add(['secondary-highlight']);
        else if (row === this.selectedCell.row) 
          currentCell.htmlElement.classList.add(['secondary-highlight']);
        else if (col === this.selectedCell.column) 
          currentCell.htmlElement.classList.add(['secondary-highlight']);
      }
      
    }
  }

  /**
   * Checks if 2 cells are in the same box
   * @param {number} row1 Row index of the first cell 
   * @param {number} col1 Column index of the first cell
   * @param {number} row2 Row index of the second cell
   * @param {number} col2 Column index of the second cell
   * @returns {boolean} Whether or not the 2 cells are in the same box
   */
  #inSameBox(row1, col1, row2, col2) {
    const box1Row = Math.floor(row1 / 3);
    const box1Col = Math.floor(col1 / 3);
    const box2Row = Math.floor(row2 / 3);
    const box2Col = Math.floor(col2 / 3);

    return box1Row === box2Row && box1Col === box2Col;
  }

  #checkRow(newValue) {
    for (let i = 0; i < 9; i++) {
      const currentCell = this.cells[this.selectedCell.row][i];

      if (currentCell.column === this.selectedCell.column) continue;
      
      if (currentCell.notes.includes(newValue)) currentCell.removeNote(newValue);
      
      /* if (currentCell.value === newValue) {
        this.selectedCell.htmlElement.classList.add('invalid');
        currentCell.htmlElement.classList.add('invalid-highlight');
        this.#markCellInvalid(currentCell.row, currentCell.column);
      } */
    }
  }

  #checkColumn(newValue) {
    for (let i = 0; i < 9; i++) {
      const currentCell = this.cells[i][this.selectedCell.column];

      if (currentCell.row === this.selectedCell.row) continue;
      
      if (currentCell.notes.includes(newValue)) currentCell.removeNote(newValue);
      
      /* if (currentCell.value === newValue) {
        this.selectedCell.htmlElement.classList.add('invalid');
        currentCell.htmlElement.classList.add('invalid-highlight');
        this.#markCellInvalid(currentCell.row, currentCell.column);
      } */
    }
  }

  #checkBox(newValue) {
    const boxBounds = this.#getBoxBounds(this.selectedCell.row, this.selectedCell.column);

    for (let i = boxBounds.boxStartRow; i < boxBounds.boxEndRow; i++) {
      for (let j = boxBounds.boxStartCol; j < boxBounds.boxEndCol; j++) {
        const currentCell = this.cells[i][j];
  
        if (currentCell.row === this.selectedCell.row && currentCell.column === this.selectedCell.column)
          continue;
        
        if (currentCell.notes.includes(newValue)) currentCell.removeNote(newValue);
        
        /* if (currentCell.value === newValue) {
          this.selectedCell.htmlElement.classList.add('invalid');
          currentCell.htmlElement.classList.add('invalid-highlight');
          this.#markCellInvalid(currentCell.row, currentCell.column);
        } */
      }
    }
  }

  /**
   * Calculate the starting row and column of a block given a cell's position
   * @param {number} row - 0-based row index of the cell
   * @param {number} col - 0-based column index of the cell
   * @returns {{boxStartRow: number, boxStartCol: number, boxEndRow: number, boxEndCol: number}} An object containing the start and end row and column. Start indices are inclusive. End indices are exclusive
   * 
   * @example
   * // Cell at position (5,4) is in a block starting at (3,3)
   * const boxBounds = getBoxBounds(5, 4);
   * console.log(boxBounds); // { boxStartRow: 3, boxStartCol: 3, boxEndRow: 6, boxEndCol: 6 }
   */
  #getBoxBounds(row, col) {
    const boxSize = 3;
    const boxStartRow = Math.floor(row / boxSize) * boxSize;
    const boxStartCol = Math.floor(col / boxSize) * boxSize;

    return { 
      boxStartRow: boxStartRow,
      boxStartCol: boxStartCol,
      boxEndRow: boxStartRow + 3,
      boxEndCol: boxStartCol + 3
    };
  }

  #markCellInvalid(row, col) {
    this.cells[row][col].isValid = false;
    this.isValid = false;
  }
}
