export class Cell {
  constructor(xCoordinate, yCoordinate, value = 0) {
    this.x = xCoordinate;
    this.y = yCoordinate;
    this.value = value;
    this.htmlElement = document.createElement("div");
    this.isGiven = value !== 0;
    this.notes = [];
  }

  createHtmlElement(hasRightBorder = false, hasBottomBorder = false) {
    this.htmlElement.setAttribute('data-x-coordinate', this.x);
    this.htmlElement.setAttribute('data-y-coordinate', this.y);
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