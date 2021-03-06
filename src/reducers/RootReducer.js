import { INITIAL_DIMENSION, EMPTY_CELL } from '../constants/Constants';
import ActionTypes from '../constants/ActionTypes';
import { getInitialState, getInitialGridProps } from '../helpers/Helpers';
import { checkForWin } from '../helpers/WinCombination.Helpers';
import { getNextPlayerTool } from '../helpers/PlayerTools.Helpers';

const rootReducers = (state = getInitialState(INITIAL_DIMENSION), action) => {
    switch (action.type) {

        case ActionTypes.MAKE_STEP: {
            const {
                cells,
                playerToolIndex,
                dimension,
                playerTools,
                winCombinationLength,
                winCombination,
            } = state;
            const lastFilledCell = action.payload;
            const { column, row } = action.payload;
            const cellIndex = column + row * dimension;
            const cellValue = cells[cellIndex].value;
            const isGameInProgress = !winCombination.length;

            if (cellValue === EMPTY_CELL && isGameInProgress) {
                const newCells = cells.slice(0);
                const newCell = {
                    id: cells[cellIndex].id,
                    value: playerToolIndex,
                }
                newCells.splice(cellIndex, 1, newCell);

                const nextPlayerToolIndex = getNextPlayerTool(playerToolIndex, playerTools);
                const winCombination = checkForWin(newCells, dimension, winCombinationLength, lastFilledCell) || [];
                const newState = {
                    ...state,
                    cells: newCells,
                    playerToolIndex: nextPlayerToolIndex,
                    winCombination,
                    isGameInProgress: !winCombination.length,
                };
                return newState;
            }
            return state;
        }

        case ActionTypes.RESTART_GAME:
            return {
                ...state,
                playerToolIndex: 0,
                isGameInProgress: false,
                ...getInitialGridProps(state.dimension),
            };

        case ActionTypes.CHANGE_DIMENSION: {
            const dimension = action.payload;
            return {
                ...state,
                playerToolIndex: 0,
                ...getInitialGridProps(dimension),
            };
        }

        case ActionTypes.CHANGE_WIN_COMBINATION_LENGTH: {
            const winCombinationLength = action.payload;
            return {
                ...state,
                winCombinationLength,
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
