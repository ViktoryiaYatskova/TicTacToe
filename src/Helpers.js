import {
    INITIAL_CELL_SIZE,
    INITIAL_PLAYERS_NUMBER,
    EMPTY_CELL,
    TOOL_COLOURS,
    DEFAULT_COLOUR,
} from './constants/Constants';
import { getPlayerTools } from './PlayerTools.Helpers';

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
    } while (rowNumber < rowsNumber - 1);

    return rows;
}

/**
 * @param  {number} rowIndex
 * @param  {number} columnIndex 
 * @param  {number} columnIndimension
 * @returns {number}
 */
export function generateCellId(rowIndex, columnIndex, dimension) {
    return rowIndex * dimension + columnIndex;//`${columnIndex}-${rowIndex}`;
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
 * @param  {Number} rowsNumber
 * @returns {Array} winning cells combination
 */
export function checkForWin(cells, rowsNumber) {
    let winCombination = [];
    [checkRows, checkColumns, checkDiagonals].find((check) => {
        winCombination = check(cells, rowsNumber);
        return winCombination;
    });
    return winCombination;
}

/**
 * @param {Number} rowsNumber 
 * @param {Number} columnsNumber 
 * @returns {Array} of empty cells
 */
export const getInitialCells = (rowsNumber, columnsNumber) =>
    Array(rowsNumber * columnsNumber)
        .fill(0)
        .map((cell, idx) => ({ value: EMPTY_CELL, id: idx }));

/**
 * @param {Number} dimension 
 */
export const getInitialState = (dimension) => {
    const playerTools = getPlayerTools(INITIAL_PLAYERS_NUMBER);
    return {
        cells: getInitialCells(dimension, dimension),
        playerTools,
        playerToolIndex: 0,
        winCombination: [],
        winCombinationLength: dimension,
        dimension,
        cellSize: INITIAL_CELL_SIZE,
    };
};

export const getInitialGridProps = (dimension) => ({
    cells: getInitialCells(dimension, dimension),
    winCombination: [],
    dimension,
});

/**
 * @param {number} rowsNumber 
 * @param {number} columnsNumber 
 * @param {number} gridWidth 
 * @param {number} gridHeight 
 * @param {number} cellSize 
 * @param {string} cellSizeUnit 
 * @returns {boolean}
 */
export const shouldChangeCellSize = (rowsNumber, columnsNumber, gridWidth, gridHeight, cellSize, cellSizeUnit) => {
    const cellSizePx = convertToPx(cellSize, cellSizeUnit);
    const shouldDecreaseCell = () =>
        rowsNumber * cellSizePx > gridWidth ||
        columnsNumber * cellSizePx > gridHeight;

    const shouldIncreaseCell = () =>
        (rowsNumber + 1) * cellSizePx <= gridWidth &&
        (columnsNumber + 1) * cellSizePx <= gridHeight;

    return shouldDecreaseCell() || shouldIncreaseCell();
};

export function convertToPx(value, measurement) {
    switch (measurement) {
        case 'vmin': {
            const { clientWidth, clientHeight } = document.documentElement;
            const minDimenion = Math.min(clientHeight, clientWidth);
            return value * minDimenion / 100;
        }

        case 'px':
        default:
            return measurement;
    }
}

export function convertPxTo(value, measurement) {
    switch (measurement) {
        case 'vmin': {
            const { clientWidth, clientHeight } = document.documentElement;
            const minDimenion = Math.min(clientHeight, clientWidth);
            return value / minDimenion * 100;
        }

        case 'px':
        default:
            return measurement;
    }
}

/**
 * @param  {number} toolIndex 
 * @returns {string} 
 */
export function getToolColour(toolIndex) {
    return TOOL_COLOURS[toolIndex] || DEFAULT_COLOUR;
}

/**
 * @param  {Array} cells
 * @returns {Array|null} winning cells combination
 */
function checkRows(cells, rowsNumber) {
    const columnsNumber = cells.length / rowsNumber;
    for (let i = 0; i < rowsNumber; i++) {
        let prevCell;
        let isWin = true;

        for (let j = 0; j < columnsNumber; j++) {
            const currentCell = cells[i * columnsNumber + j];

            if (currentCell.value === EMPTY_CELL) {
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
        if (isWin) return cells.slice(i * columnsNumber, (i + 1) * columnsNumber);
    }
}

/**
 * @param  {Array} cells
 * @param {Number} rowsNumber
 * @returns {Array|null} winning cells combination
 */
function checkColumns(cells, rowsNumber) {
    const columnsNumber = cells.length / rowsNumber;

    for (let i = 0; i < columnsNumber; i++) {
        let prevCell;
        let isWin = true;

        for (let j = 0; j < rowsNumber; j++) {
            const currentCell = cells[i + j * rowsNumber];

            if (currentCell.value === EMPTY_CELL) {
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
        if (isWin) return cells.filter((cell, idx) => idx % columnsNumber === i);
    }
}

/**
 * @param  {Array} cells
 * @returns {Array|null} winning cells combination
 */
function checkDiagonals(cells, rowsNumber) {
    let prevCell;
    let isWin;
    let diagonalElements;
    const columnsNumber = cells.length / rowsNumber;
    const getFirstDiagonalElementIdx = (j) => j + j * columnsNumber;
    const getSecondDiagonalElementIdx = (j) => (columnsNumber * (j + 1) - j - 1);

    if ([getFirstDiagonalElementIdx, getSecondDiagonalElementIdx].find((getIdx) => {
        diagonalElements = [];
        isWin = true;

        for (let j = 0; j < rowsNumber; j++) {
            const currentCell = cells[getIdx(j)];

            if (currentCell.value === EMPTY_CELL) {
                isWin = false;
                break;
            }

            if (prevCell) {
                isWin = prevCell.value === currentCell.value;
                if (!isWin) break;
            } else {
                prevCell = currentCell;
            }
            diagonalElements.push(currentCell);
        }
        return isWin;
    })) {
        return diagonalElements;
    }
}