import { COLUMNS_NUMBER, ROWS_NUMBER, CellStates } from '../constants/Constants';
import ActionTypes from '../constants/ActionTypes';

const INITIAL_STATE = Array(CellStates, ROWS_NUMBER * COLUMNS_NUMBER);

const rootReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case ActionTypes.TOGGLE_CELL:
            const { x, y } = action.payload;
            const cellIndex = x + y * ROWS_NUMBER;
            const cellValue = state[cellIndex];
            const newState = state.splice(cellIndex, 1, !cellValue);

            return newState;

        default:
           return state;
    }
};

export default rootReducers;
