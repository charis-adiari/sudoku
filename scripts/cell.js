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
    this.htmlElement.textContent = this.value === '0' || this.value === 0 ? '' : this.value;

    if (hasRightBorder) this.htmlElement.classList.add('right-border');
    if (hasBottomBorder) this.htmlElement.classList.add('bottom-border');

    $('#sudoku-board').append(this.htmlElement);
  }

  getHtmlElement() {
    return this.htmlElement;
  }

  setValue(value) {
    this.value = value;
    this.htmlElement.textContent = value;
  }
}