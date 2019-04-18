import React from 'react';
import Cell from '../cell/cell';
import './row.css';
import { isWinCell } from '../../../helpers/WinCombination.Helpers';

const Row = ({ cells, rowIndex, winCombination, cellSize, playerTools }) => (
    <div className="row">
        {cells.map((cell, columnIndex) =>
            (<Cell
                cellState={cell.value}
                cellSize={cellSize}
                playerTools={playerTools}
                coordinates={{ row: rowIndex, column: columnIndex }}
                key={cell.id}
                isWinCell={isWinCell(winCombination, cell)}
            />)
        )}
    </div>
)

export default Row;
