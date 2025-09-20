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

    this.puzzleArray = [];
    this.solutionArray = [];

    this.#toggleLoading();
    this.#initGameControls();
  }

  startNewGame(level = 'easy') {
    this.isLoading = true;
    this.#toggleLoading();
    this.stopGame();

    this.level = level;

    this.#setPuzzle();
    
    this.isLoading = false;
    this.#toggleLoading();
    this.timer.restartTimer();
  }

  stopGame() {
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
    
    this.board.createCellsFromArray(this.puzzleArray);
  }

  #toggleLoading() {
    if (this.isLoading) $('#loading').removeClass('hidden');
    else $('#loading').addClass('hidden');
  }

  #initGameControls() {
    for (let i = 0; i < 9; i++) {
      $(`#btn-${i+1}`).on('click', (e) => this.#handleNumberButtonClick(e));      
    }
  }

  #handleNumberButtonClick(e) {
    if (!this.board.selectedCell) {
      this.#toggleError();
      return;
    }

    const id = e.target.id;
    const newValue = parseInt(id.charAt(id.length - 1));

    if (!this.board.selectedCell.isGiven) {
      this.board.setCellValue(newValue);
      this.board.selectCell();
    }
  }

  #toggleError(hasError = true) {
    if (hasError)
      $('.error').removeClass('hidden');
    else
      $('.error').addClass('hidden');
  }
}
