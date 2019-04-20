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
    const style = {
        color: !isWinCell && getToolColour(cellState),
        width: cellSize + CELL_SIZE_UNIT,
        height: cellSize + CELL_SIZE_UNIT
    };
    const ElementTag =
        cellContent === 'X' ? Cross :
            cellContent === 'O' ? Nought :
                'button';

    return (<ElementTag
        style={style}
        className={classes}
        row={coordinates.row}
        column={coordinates.column}
        key={`${coordinates.row}-${coordinates.column}`}
    />);
};

const Cross = (props) => (
    <svg
        {...props}
        viewBox={`0 0 100 100`}
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        preserveAspectRatio="xMidYMid meet"
    >
        <path d="M100 100L0 0"
            opacity="1" fillOpacity="0" stroke={props.style.color}
            strokeWidth="5" strokeOpacity="1"
        />
        <path d="M0 100L100 0"
            opacity="1" fillOpacity="0" stroke={props.style.color}
            strokeWidth="5" strokeOpacity="1"
        />
    </svg>
);

const Nought = (props) => (
    <svg
        {...props}
        viewBox={`0 0 100 100`}
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        preserveAspectRatio="xMidYMid meet"
    >
        <path d="M 97 47 A 15 15 0 1 1 3 48 A 16 15 0 1 1 97 47 Z"
            opacity="1" fillOpacity="0" stroke={props.style.color} strokeWidth="5" strokeOpacity="1"
        />
    </svg>
);

export default Cell;
