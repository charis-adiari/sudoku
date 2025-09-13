import { Game } from "./scripts/game.js";
import { toggleActive, toggleDropdown } from "./scripts/utils.js";

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

$('#notes').on('click', () => toggleActive());