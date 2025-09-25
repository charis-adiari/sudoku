import { Settings } from "./utilities/settings.js";
import { Board } from "./sudoku-board.js";
import { easySeed, mediumSeed, hardSeed } from "../seed.js";
import { Timer } from "./utilities/timer.js";
import { SudokuRandomiser } from "./utilities/sudoku-randomiser.js";
import { Stats } from "./utilities/stats.js";
import { Level } from "./utilities/level-enum.js";

export class Game {
  constructor() {
    this.isLoading = true;
    this.settings = new Settings();
    this.board = new Board();
    this.timer = new Timer();
    this.isTakingNotes = false;

    this.level = Level.EASY;
    this.mistakeCount = 0;
    this.valueCounts = new Array(9).fill(0);
    this.stats = new Stats(this.level, this.timer.seconds, this.mistakeCount);

    this.puzzleArray = [];
    this.solutionArray = [];

    this.#toggleLoadingDisplay();
    this.#initGameControls();
  }

  startNewGame(level) {
    const levelEnum = Level.getLevelByName(level);

    if (!levelEnum) {
      console.error('No level selected. Can\'t start new game');
      return;
    }

    this.isLoading = true;
    this.#toggleLoadingDisplay();
    this.#stopGame();

    this.#resetGameDisplay();
    this.level = levelEnum;
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

    if (this.level === Level.EASY) seed = easySeed[Math.floor(Math.random() * easySeed.length)];
    else if (this.level === Level.MEDIUM) seed = mediumSeed[Math.floor(Math.random() * mediumSeed.length)];
    else seed = hardSeed[Math.floor(Math.random() * hardSeed.length)];

    const transformedSudoku = SudokuRandomiser.randomiseSudoku(seed.puzzle, seed.solution);
    this.puzzleArray = transformedSudoku.puzzle;
    this.solutionArray = transformedSudoku.solution;
    this.valueCounts = this.board.createCellsFromArray(this.puzzleArray);
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
    $('#notes').on('click', () => this.#toggleTakingNotes());
  }

  #handleNumberButtonClick(e) {
    if (!this.board.selectedCell) return;

    const id = e.target.id;
    const number = parseInt(id.charAt(id.length - 1));

    if (!this.board.selectedCell.isGiven) {
      if (this.isTakingNotes) this.board.toggleNote(number);
      else {
        this.#updateValueCounts(this.board.selectedCell.value, number);
        this.board.setCellValue(number);
        this.#checkForWin();
      }
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

  #toggleTakingNotes() {
    this.isTakingNotes = !this.isTakingNotes;

    if (this.isTakingNotes) {
      $('#notes').addClass('active');
      $('#notes>i').addClass('bi-pencil-fill').removeClass('bi-pencil');
    }
    else {
      $('#notes').removeClass('active');
      $('#notes>i').removeClass('bi-pencil-fill').addClass('bi-pencil');
    }
  }

  #resetGameDisplay() {
    for (let i = 0; i < 9; i++) {
      $(`#btn-${i + 1}`).removeClass('check').addClass('btn btn-number');
      $(`#btn-${i + 1}`).html(i + 1);
      $(`#btn-${i + 1}`).prop("disabled", false);
    }
    
    $('.game-controls-container').show();
    $('#stats-container').hide();
  }

  #checkForWin() {
    const isComplete = this.valueCounts.every(count => count === 9);

    if (isComplete && this.board.isValid) {
      this.#winGame();
    }
  }

  #winGame() {
    this.timer.stopTimer();
    $('.game-controls-container').hide();
    this.board.selectedCell = null;
    this.board.removeAllHighlights();
    this.stats.setCurrentStats(this.level, this.timer.seconds, this.mistakeCount);

    this.stats.display();
    $('#stats-container').show();
  }
}
