import { ROWS_NUMBER, COLUMNS_NUMBER, CellStates } from './constants/Constants';

/**
 * @param  {Array} cells
 * @param  {number} rowsNumber
 * @param  {number} columnNumber
 * @returns {Array}
 */
export function splitCellsToRows(cells, rowsNumber, columnNumber) {
    const rows = [];
    let rowNumber = 0;

    do {
        rowNumber = rows.length;
        const startIndex = rowNumber * columnNumber;
        const endIndex = startIndex + columnNumber;
        rows.push(cells.slice(startIndex, endIndex));
    } while(rowNumber < rowsNumber - 1);

    return rows;
}


/**
 * @param  {number} currentPlayerTool
 * @returns {number}
 */
export function getNextPlayerTool(currentPlayerTool) {
    return Number(!currentPlayerTool);
}


/**
 * @param  {number} rowIndex    description
 * @param  {number} columnIndex description
 * @returns {number}             description
 */
export function generateCellId(rowIndex, columnIndex) {
    return rowIndex * ROWS_NUMBER + columnIndex;//`${columnIndex}-${rowIndex}`;
}


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
 * @returns {Array} winning cells combination
 */
export function checkForWin(cells) {
    let winCombination = [];
    [checkRows, checkColumns, checkDiagonals].find((check) => {
        winCombination = check(cells);
        return winCombination;
    });
    return winCombination;
}

/**
 * @param  {Array} cells
 * @returns {Array|null} winning cells combination
 */
function checkRows(cells) {
    for (let i = 0; i < ROWS_NUMBER; i++) {
        let prevCell;
        let isWin = true;

        for(let j = 0; j < COLUMNS_NUMBER; j++) {
            const currentCell = cells[i * COLUMNS_NUMBER + j];

            if (currentCell.value === CellStates.EMPTY) {
                isWin = false;
                break;
            }

            if (prevCell) {
                isWin = prevCell.value === currentCell.value;
                if (!isWin) break;
            } else {
                prevCell = currentCell;
            }
        }
        if (isWin) return cells.slice(i * COLUMNS_NUMBER, (i + 1) * COLUMNS_NUMBER);
    }
}

/**
 * @param  {Array} cells
 * @returns {Array|null} winning cells combination
 */
function checkColumns(cells) {
    for (let i = 0; i < COLUMNS_NUMBER; i++) {
        let prevCell;
        let isWin = true;

        for(let j = 0; j < ROWS_NUMBER; j++) {
            const currentCell = cells[i + j * ROWS_NUMBER];

            if (currentCell.value === CellStates.EMPTY) {
                isWin = false;
                break;
            }

            if (prevCell) {
                isWin = prevCell.value === currentCell.value;
                if (!isWin) break;
            } else {
                prevCell = currentCell;
            }
        }
        if (isWin) return cells.filter((cell, idx) => idx % COLUMNS_NUMBER === i);
    }
}

/**
 * TODO: implement it
 * @param  {Array} cells
 * @returns {Array|null} winning cells combination
 */
function checkDiagonals(cells) {}
