import { Level } from "./level-enum.js";

/**
 * Manages the statistics for games
 */
export class Stats {
  /**
   * Init game stats
   * @param {Level} level - The game level
   * @param {number} time - Time taken to complete the game
   * @param {number} mistakeCount - The number of mistakes made during the 
   */
  constructor(level, time, mistakeCount) {
    this.currentLevel = level instanceof Level ? level : Level.EASY;
    this.currentTime = time;
    this.currentMistakeCount = mistakeCount;
    this.statsPerLevel = [
      {
        level: Level.EASY,
        totalGames: 0,
        totalTime: 0
      },
      {
        level: Level.MEDIUM,
        totalGames: 0,
        totalTime: 0
      },
      {
        level: Level.HARD,
        totalGames: 0,
        totalTime: 0
      },
    ];

    const savedStats = this.#getFromLocalStorage();

    if (savedStats) this.statsPerLevel = savedStats;
  }

  /**
   * Sets the stats for the current game (usually the one just finished)
   * @param {Level} level - The game level
   * @param {number} time - Time taken to complete the game
   * @param {number} mistakeCount - The number of mistakes made during the game
   */
  setCurrentStats(level, time, mistakeCount) {
    this.currentLevel = level;
    this.currentTime = time;
    this.currentMistakeCount = mistakeCount;
    this.#saveToLocalStorage();
  }

  display() {
    $('.level-stats').html(this.currentLevel.toString());
    $('#time').html(this.#formatTime(this.currentTime, 'HH:mm:ss'));
    $('#mistakes').html(this.currentMistakeCount);
  }

  #getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('stats'));
  }

  #saveToLocalStorage() {
    localStorage.setItem('stats', JSON.stringify(this.statsPerLevel));
  }

  #formatTime(totalSeconds, format) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (format === 'HH:mm:ss') {
      const pad = (num) => num.toString().padStart(2, '0');
  
      if (hours > 0) {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
      } else {
        return `${pad(minutes)}:${pad(seconds)}`;
      }
    }
  }
}