export class SudokuRandomiser {
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
  static randomiseSudoku(puzzleString, solutionString) {
    const puzzleArray = this.#parseSudokuString(puzzleString);
    const solutionArray = this.#parseSudokuString(solutionString);

    const rotationWeights = [0, 1, 1, 2, 2, 3, 3]; //less likely to be rotated 0 times
    const rotations = rotationWeights[Math.floor(Math.random() * rotationWeights.length)];

    const rotatedSudoku = this.#rotateSudoku(puzzleArray, solutionArray, rotations);
    this.#shuffleRowsInBands(rotatedSudoku.puzzle, rotatedSudoku.solution);
    const finalSudoku = this.#swapNumbers(rotatedSudoku.puzzle, rotatedSudoku.solution)
    console.log('Still swapping?')
    console.table(finalSudoku.solution)

    return {
      puzzle: finalSudoku.puzzle,
      solution: finalSudoku.solution
    };
  }

  /**
   * Parses a sudoku board stored as a string into a 2D array
   * @param {string} sudokuString - Sudoku board as a string of 81 characters with 0 in the place of nulls
   * @returns {number[][]} A 2D array consisting of 9 arrays with 9 numbers each
   */
  static #parseSudokuString(sudokuString) {
    return sudokuString.match(/.{9}/g).map(row =>
      row.split('').map(digit => parseInt(digit))
    );
  }

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
      puzzle: transformedPuzzle,
      solution: transformedSolution
    };
  }

  static #swapNumbers(puzzleArray, solutionArray) {
    //create array of numbers 1-9 in random order
    const numbers = this.#fisherYatesShuffle(Array.from({ length: 9 }, (_, i) => i + 1));

    //create "lookup table" storing original number and number it should be mapped to
    const conversion = {};
    numbers.forEach((element, index) => conversion[index + 1] = element);

    const shuffledPuzzle = puzzleArray.map(row =>
      row.map(cell => cell === 0 ? 0 : conversion[cell])
    );

    const shuffledSolution = solutionArray.map(
      row => row.map(cell => conversion[cell])
    );

    return {
      puzzle: shuffledPuzzle,
      solution: shuffledSolution
    }
  }

  static #shuffleRowsInBands(puzzleArray, solutionArray) {
    for (let band = 0; band < 3; band++) {
      const start = band * 3;
      
      const solutionRows = [0, 1, 2].map(i => solutionArray[start + i]);
      const puzzleRows = [0, 1, 2].map(i => puzzleArray[start + i]);

      const indices = [0, 1, 2];
      this.#fisherYatesShuffle(indices);

      indices.forEach((shuffledIndex, originalIndex) => {
        solutionArray[start + originalIndex] = solutionRows[shuffledIndex];
        puzzleArray[start + originalIndex] = puzzleRows[shuffledIndex];
      });
    }
  }

  static #fisherYatesShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const swapIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[swapIndex]] = [array[swapIndex], array[i]];
    }

    return array;
  }

}