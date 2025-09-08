import { GameSettings } from "./scripts/game-settings.js";
import { Board } from "./scripts/sudoku-board.js";
import { Timer } from "./scripts/utils.js";

class Game {
  constructor() {
    this.settings = this.#initSettings();
    this.board = new Board($('#sudoku-board').width());
    this.timer = new Timer();
  }

  startNewGame() {
    this.#createBoard();
    this.timer.startTimer();
  }

  #createBoard() {
    this.board.createCells();
    console.log('board', this.board);
    console.log(this.board.cells[2][6].getHtmlElement());
  }

  #initSettings() {
    const savedSettings = JSON.parse(localStorage.getItem('game-settings'));
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

  #applySetttings() {

  }
}

const newGame = () => {
  const game = new Game();
  game.startNewGame();
}

newGame();