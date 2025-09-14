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
   * @param {string} puzzleString - Sudoku puzzle as a string of 81 characters with 0 in the place of nulls
   * @param {string} solutionString - Complete sudoku solution as a string of 81 characters
   * @returns {{puzzle: number[][], solution: number[][]}} Object containing transformed puzzle and solution as 2D arrays
   */
  static generateSudoku(puzzleString, solutionString) {
    const puzzleArray = this.parseSudokuString(puzzleString);
    const solutionArray = this.parseSudokuString(solutionString);

    const rotationWeights = [0, 1, 1, 2, 2, 3, 3]; //less likely to be rotated 0 times
    const rotations = rotationWeights[Math.floor(Math.random() * rotationWeights.length)];
    console.log(`Rotating ${rotations} times`);

    const transformedSudoku = this.#rotateSudoku(puzzleArray, solutionArray, rotations);

    return {
      puzzle: transformedSudoku.rotatedPuzzle,
      solution: transformedSudoku.rotatedSolution
    };
  }

  /**
   * Rotates sudoku board by 90 degrees a specified number of times
   * @param {number[][]} puzzleArray - Sudoku puzzle as 2D array with 0 used in place of nulls
   * @param {number[][]} solutionArray - Complete sudoku solution as 2D array
   * @param {number} noRotations - No of times to rotate the puzzle (between 0 and 3)
   * @returns {{rotatedPuzzle: number[][], rotatedSolution: number[][]}} object containing rotated puzzle and solution as 2D arrays
   */
  static #rotateSudoku(puzzleArray, solutionArray, noRotations) {
    const size = 9;

    let transformedPuzzle = puzzleArray;
    let transformedSolution = solutionArray;

    for (let i = 0; i < noRotations; i++) {
      transformedPuzzle = Array.from({ length: size }, (_, i) =>
        Array.from({ length: 9 }, (_, j) =>
          transformedPuzzle[size - 1 - j][i]
        ));

      transformedSolution = Array.from({ length: size }, (_, i) =>
        Array.from({ length: 9 }, (_, j) =>
          transformedSolution[size - 1 - j][i]
        ));
    }

    return {
      rotatedPuzzle: transformedPuzzle,
      rotatedSolution: transformedSolution
    };
  }
}