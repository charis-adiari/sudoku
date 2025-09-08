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

console.log('gameSettings', gameSettings);


const newGame = () => {
  const board = new Board($('#sudoku-board').width());  
  board.createCells();
  console.log('board', board);
  
  console.log(board.cells[0][3].getHtmlElement());
}

newGame();