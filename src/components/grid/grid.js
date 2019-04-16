import React from 'react';
import { connect } from 'react-redux';
import './grid.css';
import Row from './row/row';
import { splitCellsToRows, shouldChangeCellSize, convertPxTo } from '../../Helpers';
import ActionTypes from '../../constants/ActionTypes';
import { CELL_SIZE_UNIT } from '../../constants/Constants';

class Grid extends React.PureComponent {
    constructor(props) {
        super(props);
        this.gridRef = React.createRef();
    }

    render() {
        const { rows, onCellClick, winCombination, cellSize, playerTools } = this.props;

        return (<div className="grid-wrapper" onClick={onCellClick} ref={this.gridRef} >
            <div className="grid">
                {rows.map((cells, rowIndex) =>
                    (<Row
                        playerTools={playerTools}
                        cells={cells}
                        rowIndex={rowIndex}
                        key={rowIndex}
                        cellSize={cellSize}
                        winCombination={winCombination}
                    />)
                )}
            </div>
        </div>)
    }

    componentDidUpdate() {

        this.adjustCellSize(this.props);
    }

    componentDidMount() {
        this.adjustCellSize(this.props);
    }

    adjustCellSize({ dimension, dispatchUpdateCellSize, cellSize }) {
        const gridDomElement = this.gridRef.current;
        const { clientWidth, clientHeight } = gridDomElement;
        const minClientSize = Math.min(clientHeight, clientWidth);
        const currentCellSize = this.props.cellSize;
        let resultCellSize = currentCellSize;

        if (shouldChangeCellSize(dimension, dimension, clientWidth, clientHeight, cellSize, CELL_SIZE_UNIT)) {
            resultCellSize = convertPxTo(minClientSize, CELL_SIZE_UNIT) / dimension;
        }

        if (resultCellSize !== currentCellSize) {
            dispatchUpdateCellSize(resultCellSize);
        }
    }
};

const mapStateToProps = ({ cells, winCombination, dimension, cellSize, playerTools }) => ({
    rows: splitCellsToRows(cells, dimension, dimension),
    winCombination,
    dimension,
    cellSize,
    playerTools,
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
    },

    /**
     * @param  {number} newCellSize 
     */
    dispatchUpdateCellSize: (newCellSize) => {
        return dispatch({
            type: ActionTypes.CHANGE_CELL_SIZE,
            payload: newCellSize
        });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
