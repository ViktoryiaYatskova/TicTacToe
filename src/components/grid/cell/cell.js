import React from 'react';
import './cell.css';
import { EMPTY_CELL, CELL_SIZE_UNIT } from '../../../constants/Constants';
import { getToolColour } from '../../../helpers/Helpers';

const Cell = ({ cellState, coordinates, isWinCell, cellSize, playerTools }) => {
    // const cellStateClass = CellStateClasses[cellState];
    const classes = `cell 
                    ${cellState === EMPTY_CELL ? 'empty-cell' : ''} 
                    ${isWinCell ? 'win-cell' : ''}`;
    const cellContent = playerTools[cellState] || '';
    return (<button
        style={{
            color: !isWinCell && getToolColour(cellState),
            width: cellSize + CELL_SIZE_UNIT,
            height: cellSize + CELL_SIZE_UNIT
        }}
        className={classes}
        row={coordinates.row}
        column={coordinates.column}
        key={`${coordinates.row}-${coordinates.column}`}
    >{cellContent}</button>);
};

export default Cell;
