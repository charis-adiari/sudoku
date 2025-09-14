export class SudokuGenerator {
  /**
   * Parses a sudoku board stored as a string into a 2D array
   * @param {string} sudokuString - Sudoku board as a string of 81 characters with 0 in the place of nulls
   * @returns {number[][]} A 2D array consisting of 9 arrays with 9 numbers each
   */
  static parseSudokuString(sudokuString) {
    return sudokuString.match(/.{9}/g).map(row =>
      row.split('').map(digit => parseInt(digit))
    );
  }

  /**
   * Converts a sudoku board stored as a 2D array into a string
   * @param {number[][]} sudokuArray - Sudoku board as a 2D array consisiting of 9 arrays with 9 numbers each. 0 should be used in place of nulls
   * @returns {string} A string with 81 characters
   */
  static arrayToString(sudokuArray) {
    return sudokuArray.flat().join('');
  }

  static shufflePuzzle() {}
}