import { GameSettings } from "./game-settings.js";

const savedSettings = JSON.parse(localStorage.getItem('game-settings'));

const gameSettings = new GameSettings(
  savedSettings.trainingWheels, 
  savedSettings.trackMistakes, 
  savedSettings.nightMode
);