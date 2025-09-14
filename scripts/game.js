import { GameSettings } from "./game-settings.js";
import { Board } from "./sudoku-board.js";
import { easySeed, mediumSeed, hardSeed } from "../seed.js";
import { Timer } from "./utilities/timer.js";
import { SudokuGenerator } from "./utilities/sudoku-generator.js";

export class Game {
  constructor() {
    this.isLoading = true;
    this.settings = this.initSettings();
    this.board = new Board($('#sudoku-board').width());
    this.timer = new Timer();

    this.level = 'easy';
    this.mistakeCount = 0;

    this.puzzleArray = [];
    this.solutionArray = [];

    this.#toggleLoading();
  }

  startNewGame(level = 'easy') {
    this.isLoading = true;
    this.#toggleLoading();
    this.stopGame();

    this.settings = this.initSettings();
    this.level = level;

    this.#setPuzzle();
    
    this.isLoading = false;
    this.#toggleLoading();
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

  stopGame() {
    this.timer.stopTimer();
  }

  #setPuzzle() {
    let seed;
    
    if (this.level === 'easy') seed = easySeed[Math.floor(Math.random() * easySeed.length)];
    else if (this.level === 'medium') seed = mediumSeed[Math.floor(Math.random() * mediumSeed.length)];
    else seed = hardSeed[Math.floor(Math.random() * hardSeed.length)];
    
    const transformedSudoku = SudokuGenerator.generateSudoku(seed.puzzle, seed.solution);
    this.puzzleArray = transformedSudoku.puzzle;
    this.solutionArray = transformedSudoku.solution;
    
    this.board.createCellsFromArray(this.puzzleArray);
  }

  #getSetttingsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('game-settings'));
  }

  #toggleLoading() {
    if (this.isLoading) $('#loading').removeClass('hidden');
    else $('#loading').addClass('hidden');
  }
}
