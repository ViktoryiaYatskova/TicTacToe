import React from 'react';
import { connect } from 'react-redux';
import './grid.css';
import Row from './row';
import { splitCellsToRows } from '../../Helpers';
import ActionTypes from '../../constants/ActionTypes';
import { ROWS_NUMBER, COLUMNS_NUMBER } from '../../constants/Constants';

const Grid = ({ rows, winCombination, onCellClick }) => (
    <div className="grid" onClick={onCellClick}>
        {rows.map((cells, rowIndex) =>
            (<Row
                cells={cells}
                rowIndex={rowIndex}
                key={rowIndex}
                winCombination={winCombination}
            />)
        )}
    </div>
);

const mapStateToProps = ({ cells, winCombination }) => ({
    rows: splitCellsToRows(cells, ROWS_NUMBER, COLUMNS_NUMBER),
    winCombination,
});

const mapDispatchToProps = (dispatch) => ({
    onCellClick: (clickEvent) => {
        const { target } = clickEvent;

        if (target.classList.contains('cell')) {
            clickEvent.stopPropagation();

            const row = +target.getAttribute('row');
            const column = +target.getAttribute('column');

            return dispatch({
                type: ActionTypes.MAKE_STEP,
                payload: { row, column },
            });
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
