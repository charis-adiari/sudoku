export class Cell {
  constructor(row, column, value = 0) {
    this.row = row;
    this.column = column;
    this.value = value;
    this.htmlElement = document.createElement("div");
    this.isGiven = value !== 0;
    this.notes = [];
  }

  createHtmlElement(hasRightBorder = false, hasBottomBorder = false) {
    this.htmlElement.setAttribute('data-x-coordinate', this.row);
    this.htmlElement.setAttribute('data-y-coordinate', this.column);
    this.htmlElement.classList.add('cell');

    if (this.hasNullValue()) this.isGiven = false;
    else {
      this.isGiven = true;
      this.htmlElement.classList.add('is-given')
      this.htmlElement.textContent = this.value;
    }

    if (hasRightBorder) this.htmlElement.classList.add('right-border');
    if (hasBottomBorder) this.htmlElement.classList.add('bottom-border');

    $('#sudoku-board').append(this.htmlElement);
  }

  getHtmlElement() {
    return this.htmlElement;
  }

  /**
   * Sets the value of a cell and updates the display
   * @param {number} value 
   */
  setValue(value) {
    this.value = value;
    this.updateDisplay();
  }

  /**
   * Clears cell value and all notes
   */
  erase() {
    this.value = 0;
    this.notes = [];
    this.updateDisplay();
  }

  /**
   * Determines whether or not cell value is null (represented as a 0)
   * @returns {boolean}
   */
  hasNullValue() {
    return this.value === '0' || this.value === 0;
  }

  /**
   * Updates HTML element of cell
   */
  updateDisplay() {
    this.htmlElement.textContent = this.value === 0 ? '' : this.value;
    
    //TODO: set notes
  }
}