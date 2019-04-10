import React from 'react';
import './cell.css';
import { CellStateClasses } from '../../../constants/Constants';

const Cell = ({ cellState, coordinates, onCellClick, isWinCell }) =>
    (<button
        className={`
            cell
            ${CellStateClasses[cellState]}
            ${isWinCell ? 'win-cell' : ''}`
        }
        row={coordinates.row}
        column={coordinates.column}
        key={`${coordinates.row}-${coordinates.column}`}
    />);

export default Cell;
