import { Game } from "./scripts/game.js";
import { toggleDropdown, changeButtonBackgroundColour } from "./scripts/utilities/utility-functions.js";

const game = new Game();

const newGame = () => {
  const level = $('#level').val();
  game.startNewGame(level);
}

newGame();

$('#new-game-form').submit((e) => {
  e.preventDefault();
  newGame();
});

$('#settings').on('click', (e) => {
  e.stopPropagation();
  toggleDropdown()
});

$('.btn').on('click', (e) => changeButtonBackgroundColour(e));