import { COLUMNS_NUMBER, ROWS_NUMBER, CellStates, PlayerTools } from '../constants/Constants';
import ActionTypes from '../constants/ActionTypes';
import { getNextPlayerTool, checkForWin } from '../Helpers';

const INITIAL_CELLS = Array(ROWS_NUMBER * COLUMNS_NUMBER)
    .fill(0)
    .map((cell, idx) => ({ value: CellStates.EMPTY, id: idx }));

const INITIAL_STATE = {
    cells: INITIAL_CELLS,
    playerTool: PlayerTools.NOUGHT,
    winCombination: [],
};

const rootReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case ActionTypes.MAKE_STEP:
            const { cells, playerTool, winCombination } = state;
            const { column, row } = action.payload;
            const cellIndex = column + row * ROWS_NUMBER;
            const cellValue = cells[cellIndex].value;
            const isGameOver = !!winCombination.length;

            if (cellValue === CellStates.EMPTY && !isGameOver) {
                const newCells = cells.slice(0);
                const newCell = {
                    id: cells[cellIndex].id,
                    value: playerTool,
                }
                newCells.splice(cellIndex, 1, newCell);

                const nextPlayerTool = getNextPlayerTool(playerTool);
                const winCombination = checkForWin(newCells) || [];
                const newState = Object.assign({}, state, {
                    cells: newCells,
                    playerTool: nextPlayerTool,
                    winCombination,
                });
                return newState;
            }

            return state;

        case ActionTypes.RESTART_GAME:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export default rootReducers;
