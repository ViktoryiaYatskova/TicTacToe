import { INITIAL_DIMENSION, EMPTY_CELL } from '../constants/Constants';
import ActionTypes from '../constants/ActionTypes';
import { checkForWin, getInitialState, getGridProps } from '../Helpers';
import { getNextPlayerTool } from '../PlayerTools.Helpers';

const rootReducers = (state = getInitialState(INITIAL_DIMENSION), action) => {
    switch (action.type) {

        case ActionTypes.MAKE_STEP: {
            const { cells, playerToolIndex, winCombination, dimension, playerTools } = state;
            const { column, row } = action.payload;
            const cellIndex = column + row * dimension;
            const cellValue = cells[cellIndex].value;
            const isGameOver = !!winCombination.length;

            if (cellValue === EMPTY_CELL && !isGameOver) {
                const newCells = cells.slice(0);
                const newCell = {
                    id: cells[cellIndex].id,
                    value: playerToolIndex,
                }
                newCells.splice(cellIndex, 1, newCell);

                const nextPlayerToolIndex = getNextPlayerTool(playerToolIndex, playerTools);
                const winCombination = checkForWin(newCells, dimension) || [];
                const newState = {
                    ...state,
                    cells: newCells,
                    playerToolIndex: nextPlayerToolIndex,
                    winCombination,
                };
                return newState;
            }
            return state;
        }

        case ActionTypes.RESTART_GAME:
            return {
                ...state,
                playerToolIndex: 0,
                ...getGridProps(state.dimension),
            };

        case ActionTypes.CHANGE_DIMENSION: {
            const dimension = action.payload;
            return {
                ...state,
                playerToolIndex: 0,
                ...getGridProps(dimension),
            };
        }

        case ActionTypes.CHANGE_CELL_SIZE: {
            const cellSize = action.payload;
            return {
                ...state,
                cellSize
            };
        }

        default:
            return state;
    }
};

export default rootReducers;
