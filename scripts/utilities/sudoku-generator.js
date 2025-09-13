export class SudokuGenerator {
  /**
   * Parses a sudoku board stored as a string into 9 number arrays within an array
   * @param {string} sudokuString - Sudoku board as a string of 81 characters with 0 in the place of nulls
   * @returns An array consisiting of 9 arrays with 9 numbers each
   */
  static parseSudokuString(sudokuString) {
    return sudokuString.match(/.{9}/g).map(row =>
      row.split('').map(digit => parseInt(digit))
    );
  }

  /**
   * Converts a sudoku board stored as 9 number arrays within another array into a string
   * @param {[][]} sudokuArray - Sudoku board as an array consisiting of 9 arrays with 9 numbers each. 0 should be used in place of nulls
   * @returns A string with 81 characters
   */
  static arrayToString(sudokuArray) {
    return sudokuArray.flat().join('');
  }

  static shufflePuzzle() {}
}