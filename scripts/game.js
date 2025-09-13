import { GameSettings } from "./game-settings.js";
import { Board } from "./sudoku-board.js";
import { easySeed, mediumSeed, hardSeed } from "../seed.js";
import { Timer } from "./utils.js";

export class Game {
  constructor() {
    this.settings = this.initSettings();
    this.board = new Board($('#sudoku-board').width());
    this.timer = new Timer();

    this.level = 'easy';
    this.mistakeCount = 0;

    this.puzzle = [];
    this.solution = [];
  }

  startNewGame(level = 'easy') {
    this.settings = this.initSettings();
    this.level = level;

    this.#createBoard();
    this.#seedBoard();

    this.timer.restartTimer();
  }

  initSettings() {
    const savedSettings = this.#getSetttingsFromLocalStorage();
    let settings;

    if (savedSettings) {
      settings = new GameSettings(
        savedSettings.trainingWheels,
        savedSettings.trackMistakes,
        savedSettings.nightMode
      );
    } else {
      settings = new GameSettings(false, false, true);
    }

    return settings;
  }

  #createBoard() {
    this.board.createCells();
    console.log('board', this.board);
    console.log(this.board.cells[2][6].getHtmlElement());
  }

  #seedBoard() {
    let seed;

    if (this.level === 'easy') seed = easySeed[Math.floor(Math.random() * easySeed.length)];
    else if (this.level === 'medium') seed = mediumSeed[Math.floor(Math.random() * mediumSeed.length)];
    else seed = hardSeed[Math.floor(Math.random() * hardSeed.length)];

    this.puzzle = this.#parseSudokuString(seed.puzzle);
  }

  #parseSudokuString(sudokuString) {
    return sudokuString.match(/.{9}/g).map(row =>
      row.split('').map(digit => parseInt(digit))
    );
  }

  #getSetttingsFromLocalStorage() {
    const savedSettings = JSON.parse(localStorage.getItem('game-settings'));
    console.log('savedSettings: ', savedSettings);

    return savedSettings;
  }
}
