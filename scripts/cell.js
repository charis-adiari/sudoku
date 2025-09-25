export class Cell {
  constructor(row, column, value = 0) {
    this.row = row;
    this.column = column;
    this.value = value;
    this.htmlElement = document.createElement("div");
    this.isGiven = value !== 0;
    this.notes = [];
    this.isValid = true;
  }

  createHtmlElement(hasRightBorder = false, hasBottomBorder = false) {
    this.htmlElement.setAttribute('data-x-coordinate', this.row);
    this.htmlElement.setAttribute('data-y-coordinate', this.column);
    this.htmlElement.classList.add('cell');

    if (this.hasNullValue()) {
      this.isGiven = false;
      this.htmlElement.innerHTML = this.#getElementInnerHtml();
    } else {
      this.isGiven = true;
      this.htmlElement.classList.add('is-given')
      this.htmlElement.innerHTML = this.value;
    }

    if (hasRightBorder) this.htmlElement.classList.add('right-border');
    if (hasBottomBorder) this.htmlElement.classList.add('bottom-border');

    $('#sudoku-board').append(this.htmlElement);
  }

  getHtmlElement() {
    return this.htmlElement;
  }

  /**
   * Sets the value of a cell, clears cell notes and and updates the display
   * @param {number} value - The number to display in the cell (1 - 9). Cell value should be removed with the {@link erase} function
   */
  setValue(value) {
    this.value = value;
    this.notes = [];
    this.htmlElement.innerHTML = this.#getElementInnerHtml(this.value);
  }

  /**
   * Clears cell value and all notes
   */
  erase() {
    this.value = 0;
    this.notes = [];
    this.htmlElement.innerHTML = this.#getElementInnerHtml();
  }

  /**
   * Determines whether or not cell value is null (represented as a 0)
   * @returns {boolean}
   */
  hasNullValue() {
    return this.value === '0' || this.value === 0;
  }

  /**
   * Adds a note to the cell
   * @param {number} number - The number that should be in the note (1 - 9)
   */
  addNote(number) {
    this.notes.push(number);
    
    if (this.value !== 0) {
      this.value = 0;
      this.htmlElement.innerHTML = this.#getElementInnerHtml();
    }

    $(`#notes-container-${this.row}-${this.column}`).removeClass('hidden');
    $(`#note-${this.row}-${this.column}-${number}`).addClass('show');
  }

  /**
   * Removes a note from the cell
   * @param {number} number - The number in the note that should be removed (1 - 9)
   */
  removeNote(number) {
    this.notes = this.notes.filter(n => n !== number);
    $(`#note-${this.row}-${this.column}-${number}`).removeClass('show');

    if (this.notes.length === 0) 
      $(`#notes-container-${this.row}-${this.column}`).addClass('hidden');
  }

  #getElementInnerHtml(value = '') {
    return `${value}
    <div id="notes-container-${this.row}-${this.column}" class="notes-container hidden">
      <span id="note-${this.row}-${this.column}-1" class="note">1</span>
      <span id="note-${this.row}-${this.column}-2" class="note">2</span>
      <span id="note-${this.row}-${this.column}-3" class="note">3</span>
      <span id="note-${this.row}-${this.column}-4" class="note">4</span>
      <span id="note-${this.row}-${this.column}-5" class="note">5</span>
      <span id="note-${this.row}-${this.column}-6" class="note">6</span>
      <span id="note-${this.row}-${this.column}-7" class="note">7</span>
      <span id="note-${this.row}-${this.column}-8" class="note">8</span>
      <span id="note-${this.row}-${this.column}-9" class="note">9</span>
    </div>`;
  }
}