import React from 'react';
import './grid.css';
import Row from './row';
import { convertCellIndexToCoordinated, splitCellsToRows } from '../../Helpers';
import { connect } from 'react-redux';
import { ROWS_NUMBER, COLUMNS_NUMBER } from '../../constants/Constants';

const Grid = ({ rows, winCombination }) => (
    <div className="grid">
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

export default connect(mapStateToProps)(Grid);
