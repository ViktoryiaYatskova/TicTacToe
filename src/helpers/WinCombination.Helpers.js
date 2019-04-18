import { EMPTY_CELL } from '../constants/Constants';

/**
 * @param  {Array} winningCombination
 * @returns {boolean}
 */
export function isWinCell(winningCombination, cell) {
    if (winningCombination.length) {
        return !!winningCombination.find((winCell) => winCell.id === cell.id)
    }
    return false;
}

/**
 * @param  {Array} cells
 * @param  {number} rowsNumber
 * @param  {number} winCombinationLength
 * @param  {{row: number, column: number}} lastFilledCell
 * @returns {Array} winning cells combination
 */
export function checkForWin(cells, rowsNumber, winCombinationLength, lastFilledCell) {
    let winCombination = [];
    [checkRows, checkColumns, checkCurrentSubDiagonals].find((check) => {
        winCombination = check(cells, rowsNumber, winCombinationLength, lastFilledCell);
        return winCombination;
    });
    return winCombination;
}

/**
 * @param  {Array} cells
 * @param {number} rowsNumber
 * @param {number} winCombinationLength
 * @param  {{row: number, column: number}} lastFilledCell
 * @returns {Array|null} winning cells combination
 */
function checkRows(cells, rowsNumber, winCombinationLength, lastFilledCell) {
    const columnsNumber = cells.length / rowsNumber;
    const targetRow = lastFilledCell.row;
    const targetTool = cells[targetRow * columnsNumber + lastFilledCell.column].value;
    const winCombination = [];

    for (let j = 0; j < columnsNumber; j++) {
        const currentCell = cells[targetRow * columnsNumber + j];

        if (currentCell.value === targetTool) {
            winCombination.push(currentCell);
            continue;
        }

        if (winCombination.length >= winCombinationLength) {
            return winCombination;
        }

        const restRowCellsNumber = columnsNumber - j;
        if (restRowCellsNumber < winCombinationLength) {
            // no sense to continue checking
            return null;
        } else {
            winCombination.length = 0;
        }
    }
    return winCombination;
}

/**
 * @param  {Array} cells
 * @param {number} rowsNumber
 * @param {number} winCombinationLength
 * @param  {{row: number, column: number}} lastFilledCell
 * @returns {Array|null} winning cells combination
 */
function checkColumns(cells, rowsNumber, winCombinationLength, lastFilledCell) {
    const columnsNumber = cells.length / rowsNumber;
    const targetColumn = lastFilledCell.column;
    const targetTool = cells[lastFilledCell.row * columnsNumber + targetColumn].value;
    const winCombination = [];

    for (let j = 0; j < columnsNumber; j++) {
        const currentCell = cells[j * columnsNumber + targetColumn];

        if (currentCell.value === targetTool) {
            winCombination.push(currentCell);
            continue;
        }

        if (winCombination.length >= winCombinationLength) {
            return winCombination;
        }

        const restColumnCellsNumber = columnsNumber - j;
        if (restColumnCellsNumber < winCombinationLength) {
            // no sense to continue checking
            return null;
        } else {
            winCombination.length = 0;
        }
    }
    return winCombination;
}

function getCurrentElementLeftDiagonalIterator({ row, column }, rowsNumber, columnsNumber) {
    const minParam = Math.min(row, column);
    const startElement = {
        row: row - minParam,
        column: column - minParam
    };

    return function* iterator() {
        for (let { row, column } = startElement;
            row < rowsNumber && column < columnsNumber;
            ++row, ++column) {

            yield row * columnsNumber + column;
        }
        return;
    };
}

function getCurrentElementRightDiagonalIterator({ row, column }, rowsNumber, columnsNumber) {
    const minDestinationToBorder = Math.min(row, columnsNumber - column - 1);
    const startElement = {
        row: row - minDestinationToBorder,
        column: column + minDestinationToBorder
    };

    return function* iterator() {
        for (let { row, column } = startElement;
            row < rowsNumber && column >= 0;
            ++row, --column) {

            yield row * columnsNumber + column;
        }
        return;
    };
}

/**
 * @param  {number} firstDiagonalElementIdx 
 * @param  {any} dimension 
 * @return 
 */
function getSubDiagonalLength(firstDiagonalElementIdx, dimension) {
    const column = firstDiagonalElementIdx % dimension;
    const row = Math.floor(firstDiagonalElementIdx / dimension);
    const isLeftDiagonal = !row || !column;
    const maxDiagonalLength = Math.sqrt(2) * dimension;
    return isLeftDiagonal ?
        maxDiagonalLength - Math.max(row, column) :
        maxDiagonalLength - dimension + Math.max(row, column);
}

/**
 * @param  {Array} cells
 * @param {number} rowsNumber
 * @param {number} winCombinationLength
 * @param  {{row: number, column: number}} lastFilledCell
 * @returns {Array|null} winning cells combination
 */
function checkCurrentSubDiagonals(cells, rowsNumber, winCombinationLength, lastFilledCell) {
    const columnsNumber = cells.length / rowsNumber;
    const targetTool = cells[lastFilledCell.row * columnsNumber + lastFilledCell.column].value;
    const winCombinations = [
        getCurrentElementLeftDiagonalIterator(lastFilledCell, rowsNumber, columnsNumber)(),
        getCurrentElementRightDiagonalIterator(lastFilledCell, rowsNumber, columnsNumber)(),
    ].map((diagonalIterator) => {
        const winCombination = [];
        const firstDiagonalElement = diagonalIterator.next();
        const diagonalLength = getSubDiagonalLength(firstDiagonalElement, rowsNumber);

        for (let next = firstDiagonalElement;
            !next.done;
            next = diagonalIterator.next()) {

            const nextElementIdx = next.value;
            const currentCell = cells[nextElementIdx];
            const isSequenceInterrupted = currentCell.value !== targetTool;
            const hasWinCombinationReachLength = winCombination.length >= winCombinationLength;

            if (!isSequenceInterrupted) {
                winCombination.push(currentCell);
                continue;
            }

            if (!hasWinCombinationReachLength) {
                const restSubsequenceLength = diagonalLength - winCombination.length - 1;

                if (restSubsequenceLength < winCombinationLength) {
                    // no sense to proceed checking, as rest cells number is not enough
                    return null;
                }
                // erase array and proceed checking
                winCombination.length = 0;
                continue;
            } else {
                return winCombination;
            }
        }
        return winCombination;
    });

    return winCombinations.find(combination =>
        combination && combination.length === winCombinationLength);
}