export class Level {
  constructor(level) {
    this.level = level;
  }

  static EASY = new Level('Easy');
  static MEDIUM = new Level('Medium');
  static HARD = new Level('Hard');

  toString() {
    return this.level
  }

  toLower() {
    return this.level.toLowerCase();
  }

  static getLevelByName(level) {
    level = level.toLowerCase();

    switch (level) {
      case 'easy':
        return Level.EASY;

      case 'medium':
        return Level.MEDIUM;

      case 'hard':
        return Level.HARD;
    }
  }
};