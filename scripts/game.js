import { GameSettings } from "./game-settings.js";
import { Board } from "./sudoku-board.js";
import { easySeed, mediumSeed, hardSeed } from "../seed.js";
import { Timer } from "./utils.js";

export class Game {
  constructor() {
    this.settings = this.initSettings();
    this.board = new Board($('#sudoku-board').width());
    this.timer = new Timer();
  }

  startNewGame() {
    this.#createBoard();
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

  #clearBoard() {
    
  }

  #getSetttingsFromLocalStorage() {
    const savedSettings = JSON.parse(localStorage.getItem('game-settings'));
    console.log('savedSettings: ', savedSettings);

    return savedSettings;
  }
}
