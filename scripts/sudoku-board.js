import { Cell } from "./cell.js";

export class Board {
  constructor(boardWidth) {
    this.length = boardWidth;
    this.cells = [];
    this.selectedCell = null;

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

  /**
   * Sets the value of a cell
   * @param {number} newValue 
   */
  setCellValue(newValue) {    
    this.selectedCell.setValue(newValue);
  }
  
  /**
   * Adds and remove highlights as needed for the cell currently selected (this.selectedCell)
   */
  selectCell() {
    $('.cell').removeClass('selected-highlight secondary-highlight same-value-highlight');

    this.selectedCell.htmlElement.classList.add('selected-highlight');

    this.#addHighlights(
      this.selectedCell.row, 
      this.selectedCell.column, 
      ['same-value-highlight'], 
      ['secondary-highlight']
    );
  }

  #handleClick(event) {
    if (!$('.error').hasClass('hidden')) $('.error').addClass('hidden');

    const htmlElement = event.target.closest('.cell');

    if (!htmlElement) {
      console.error('Couldn\'t find closest cell');
      return;
    }

    const row = parseInt(htmlElement.dataset.xCoordinate);
    const col = parseInt(htmlElement.dataset.yCoordinate);
    this.selectedCell = this.cells[row][col];
    this.selectCell();
  }

  /**
   * Applies CSS classes to all cells in the same row, column and block and cells with the same value 
   * except the selected cell
   * @param {number} selectedRow - Index of selected cell row
   * @param {number} selectedCol - Index of selected cell column
   * @param {string[]} sameValueClasses - Classes to be applied on cells with the same value as the selected cell
   * @param {string[]} sameValueClasses - Classes to be applied on cells in the same block, row, or column
   */
  #addHighlights(selectedRow, selectedCol, sameValueClasses, secondaryClasses) {
    const selectedCellValue = this.cells[selectedRow][selectedCol].value;
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const currentCell = this.cells[row][col];

        if (row === selectedRow && col === selectedCol) continue;

        if (selectedCellValue !== 0 && selectedCellValue === currentCell.value)
          currentCell.htmlElement.classList.add(...sameValueClasses);
        else if (this.#inSameBlock(selectedRow, selectedCol, row, col))
          currentCell.htmlElement.classList.add(...secondaryClasses);
        else if (row === selectedRow) currentCell.htmlElement.classList.add(...secondaryClasses);
        else if (col === selectedCol) currentCell.htmlElement.classList.add(...secondaryClasses);
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

  #clearBoard() {
    this.cells = [];
    $('#sudoku-board').empty();
  }
}
