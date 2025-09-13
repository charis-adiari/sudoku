import { Game } from "./scripts/game.js";
import { easySeed, mediumSeed, hardSeed } from "./seed.js";
import { toggleActive, toggleDropdown } from "./scripts/utils.js";

const game = new Game();

const newGame = () => {
  game.startNewGame();
  const level = $('#level').val();

  game.settings = game.initSettings();
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