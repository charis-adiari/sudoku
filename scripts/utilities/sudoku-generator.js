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
   * @param {number[][]} sudokuArray - Sudoku board consisiting of 9 arrays with 9 numbers each. 0 should be used in place of nulls
   * @returns {string} A string with 81 characters
   */
  static arrayToString(sudokuArray) {
    return sudokuArray.flat().join('');
  }

  /**
 * Generates a valid sudoku board by performing random transformations on a valid seed board
 * @param {string} puzzleString - Sudoku board as a string of 81 characters with 0 in the place of nulls
 * @param {string} solutionString - Complete sudoku solution as a string of 81 characters
 * @returns {{puzzle: number[][], solution: number[][]}} Object containing transformed puzzle and solution as 2D arrays
 */
  static generateSudoku(puzzleString, solutionString) {
    const puzzleArray = this.parseSudokuString(puzzleString);
    const solutionArray = this.parseSudokuString(solutionString);

    const rotationWeights = [0, 1, 1, 2, 2, 3, 3]; //less likely to be rotated 0 times
    const rotations = rotationWeights[Math.floor(Math.random() * rotationWeights.length)];
    console.log(`Rotating ${rotations} times`);

    let transformedPuzzle = puzzleArray;
    let transformedSolution = solutionArray;

    for (let i = 0; i < rotations; i++) {
      transformedPuzzle = this.#rotateSudoku(transformedPuzzle);
      transformedSolution = this.#rotateSudoku(transformedSolution);
    }

    return {
      puzzle: transformedPuzzle,
      solution: transformedSolution
    };
  }

  /**
   * Rotates 2D sudoku array by 90 degrees
   * @param {number[][]} sudokuArray - Sudoku board consisiting of 9 arrays with 9 numbers each. 0 should be used in place of nulls
   * @returns {number[][]} Sudoku board with all numbers rotated 90 degrees
   */
  static #rotateSudoku(sudokuArray) {
    const size = 9;
    
    return Array.from({ length: size }, (_, i) =>
      Array.from({ length: 9 }, (_, j) =>
        sudokuArray[size - 1 - j][i]
      ));
  }
}