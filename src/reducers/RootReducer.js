import { INITIAL_DIMENSION, CellStates } from '../constants/Constants';
import ActionTypes from '../constants/ActionTypes';
import { getNextPlayerTool, checkForWin, getInitialState } from '../Helpers';

const rootReducers = (state = getInitialState(INITIAL_DIMENSION), action) => {
    switch (action.type) {

        case ActionTypes.MAKE_STEP: {
            const { cells, playerTool, winCombination, dimension } = state;
            const { column, row } = action.payload;
            const cellIndex = column + row * dimension;
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
                const winCombination = checkForWin(newCells, dimension) || [];
                const newState = {
                    ...state,
                    cells: newCells,
                    playerTool: nextPlayerTool,
                    winCombination,
                };
                return newState;
            }
            return state;
        }

        case ActionTypes.RESTART_GAME:
            return getInitialState(state.dimension);

        case ActionTypes.CHANGE_DIMENSION: {
            const dimension = action.payload;
            return getInitialState(dimension);
        }

        default:
            return state;
    }
};

export default rootReducers;
