import React from 'react';
import { connect } from 'react-redux'
import ActionTypes from '../../constants/ActionTypes';
import { MIN_DIMENSION } from '../../constants/Constants';
import './control-panel.css';

const ControlPanel = ({ onRestartClick, onChangeDimension, dimension }) => (
    <div className="control-panel">
        <label htmlFor="dimension">Dimension</label>
        <input
            id="dimension-input"
            name="dimension"
            type="text"
            onKeyUp={onChangeDimension}
        />
        <label htmlFor="win-combination-length">Win dimension length</label>
        <input
            type="range"
            id="win-combination-length"
            name="win-combination-length"
            min={MIN_DIMENSION} max={dimension}
        />
        <button
            id="restart-btn"
            onClick={onRestartClick}>

            Restart Game
        </button>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    onRestartClick: () => dispatch({
        type: ActionTypes.RESTART_GAME
    }),

    onChangeDimension: (keyEvent) => {
        const { target, key } = keyEvent;
        const dimension = +target.value;

        if (key === 'Enter' && isValidDimension(dimension)) {
            return dispatch({
                type: ActionTypes.CHANGE_DIMENSION,
                payload: dimension
            });
        }
    }
});

function isValidDimension(dimension) {
    return dimension >= MIN_DIMENSION;
}

export default connect(
    null,
    mapDispatchToProps
)(ControlPanel);
