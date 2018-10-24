import React from 'react';
import Cell from './../cell';
import './row.css';
import { isWinCell } from '../../../Helpers';

const Row = ({ cells, rowIndex, winCombination }) => (
    <div className="row">
        {cells.map((cell, columnIndex) =>
            (<Cell cellState={cell.value}
                   coordinates={{row: rowIndex, column: columnIndex}}
                   key={cell.id}
                   isWinCell={isWinCell(winCombination, cell)}
            />)
        )}
    </div>
)

export default Row;
