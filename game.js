import { GameSettings } from "./game-settings.js";
import { Board } from "./sudoku-board.js";

const savedSettings = JSON.parse(localStorage.getItem('game-settings'));
let gameSettings;

if (savedSettings) {
  gameSettings = new GameSettings(
    savedSettings.trainingWheels, 
    savedSettings.trackMistakes, 
    savedSettings.nightMode
  );
} else {
  gameSettings = new GameSettings(false, false, true);
}

const newGame = () => {
  const board = new Board($('#sudoku-board').width());  
  board.createCells();
  console.log('board', board);
  
  console.log(board.cells[2][6].getHtmlElement());
}

newGame();