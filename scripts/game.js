import { GameSettings } from "./utilities/game-settings.js";
import { Board } from "./sudoku-board.js";
import { easySeed, mediumSeed, hardSeed } from "../seed.js";
import { Timer } from "./utilities/timer.js";
import { SudokuRandomiser } from "./utilities/sudoku-randomiser.js";

export class Game {
  constructor() {
    this.isLoading = true;
    this.settings = new GameSettings();
    this.board = new Board($('#sudoku-board').width());
    this.timer = new Timer();

    this.level = 'easy';
    this.mistakeCount = 0;
    this.valueCounts = new Array(9).fill(0);

    this.puzzleArray = [];
    this.solutionArray = [];

    this.#toggleLoadingDisplay();
    this.#initGameControls();
  }

  startNewGame(level = 'easy') {
    this.isLoading = true;
    this.#toggleLoadingDisplay();
    this.#stopGame();

    this.#resetGameControlsDisplay();
    this.level = level;
    this.#setPuzzle();

    this.isLoading = false;
    this.#toggleLoadingDisplay();
    this.timer.restartTimer();
  }

  #stopGame() {
    this.timer.stopTimer();
  }

  #setPuzzle() {
    let seed;

    if (this.level === 'easy') seed = easySeed[Math.floor(Math.random() * easySeed.length)];
    else if (this.level === 'medium') seed = mediumSeed[Math.floor(Math.random() * mediumSeed.length)];
    else seed = hardSeed[Math.floor(Math.random() * hardSeed.length)];

    const transformedSudoku = SudokuRandomiser.randomiseSudoku(seed.puzzle, seed.solution);
    this.puzzleArray = transformedSudoku.puzzle;
    this.solutionArray = transformedSudoku.solution;

    const testSudoku = [
      [3, 8, 6, 1, 7, 2, 9, 5, 4],
      [4, 1, 9, 8, 5, 3, 6, 7, 2],
      [5, 2, 7, 9, 4, 6, 8, 1, 3],
      [7, 4, 1, 3, 6, 5, 2, 9, 8],
      [6, 9, 5, 2, 1, 8, 4, 3, 7],
      [2, 3, 8, 4, 9, 7, 5, 6, 1],
      [1, 6, 3, 5, 2, 4, 7, 8, 9],
      [8, 5, 2, 7, 3, 9, 1, 4, 6],
      [9, 7, 4, 6, 8, 1, 0, 2, 0]
    ];
    this.valueCounts = this.board.createCellsFromArray(testSudoku);
    // this.valueCounts = this.board.createCellsFromArray(this.puzzleArray);
  }

  #toggleLoadingDisplay() {
    if (this.isLoading) $('#loading').removeClass('hidden');
    else $('#loading').addClass('hidden');
  }

  #initGameControls() {
    for (let i = 0; i < 9; i++) {
      $(`#btn-${i + 1}`).on('click', (e) => this.#handleNumberButtonClick(e));
    }

    $('#erase').on('click', () => this.#eraseCellValue());
    $('.btn-arrow').on('click', (e) => this.#handleArrowClick(e));
  }

  #handleNumberButtonClick(e) {
    if (!this.board.selectedCell) return;

    const id = e.target.id;
    const newValue = parseInt(id.charAt(id.length - 1));

    if (!this.board.selectedCell.isGiven) {
      const oldValue = this.board.selectedCell.value;

      this.#updateValueCounts(oldValue, newValue);
      this.board.setCellValue(newValue);
    }
  }

  #eraseCellValue() {
    if (!this.board.selectedCell) return;

    if (!this.board.selectedCell.isGiven) {
      const oldValue = this.board.selectedCell.value;

      this.#updateValueCounts(oldValue);
      this.board.eraseCell();
    }
  }

  #updateValueCounts(oldValue, newValue = 0) {
    if (oldValue > 0) {
      --this.valueCounts[oldValue - 1];
      this.#updateNumberButtonState(oldValue);
    }

    if (newValue > 0) {
      ++this.valueCounts[newValue - 1];
      this.#updateNumberButtonState(newValue);
    }
  }

  #updateNumberButtonState(number) {
    if (this.board.isValid && this.valueCounts[number - 1] === 9) {
      $(`#btn-${number}`).prop("disabled", true);
      $(`#btn-${number}`).removeClass('btn btn-number').addClass('check');
      $(`#btn-${number}`).html('<i class="bi bi-check-lg"></i>');
    } else {
      $(`#btn-${number}`).prop("disabled", false);
      $(`#btn-${number}`).removeClass('check').addClass('btn btn-number');
      $(`#btn-${number}`).html(number);
    }
  }

  #handleArrowClick(event) {
    if (!this.board.selectedCell) return;

    const arrowButton = event.target.closest('button');
    const direction = arrowButton.id.substring(6);
    const currentRow = this.board.selectedCell.row;
    const currentCol = this.board.selectedCell.column;

    switch (direction) {
      case 'up':
        if (currentRow > 0) this.board.setSelectedCell(currentRow - 1, currentCol);
        break;

      case 'down':
        if (currentRow < 8) this.board.setSelectedCell(currentRow + 1, currentCol);
        break;

      case 'left':
        if (currentCol > 0) this.board.setSelectedCell(currentRow, currentCol - 1);
        break;

      case 'right':
        if (currentCol < 8) this.board.setSelectedCell(currentRow, currentCol + 1);
        break;
    }
  }

  #resetGameControlsDisplay() {
    for (let i = 0; i < 9; i++) {
      $(`#btn-${i + 1}`).removeClass('check').addClass('btn btn-number');
      $(`#btn-${i + 1}`).html(i + 1);
    }
  }
}
