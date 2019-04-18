import React from 'react';
import { connect } from 'react-redux'
import ActionTypes from '../../constants/ActionTypes';
import { MIN_DIMENSION } from '../../constants/Constants';
import './control-panel.css';

const ControlPanel = ({
    onRestartClick,
    onChangeDimension,
    isWinCombinationRangeAvailable,
    maxWinCombinationLength,
    minWinCombinationLength,
    winCombinationLength,
    onChangeWinCombinationLength,
}) => {
    return (
        <div id="control-panel">
            <div className="control-line">
                <label
                    className="control-panel-label"
                    htmlFor="dimension">Dimension:</label>
                <input
                    id="dimension-input"
                    name="dimension"
                    className="control-panel-input"
                    type="text"
                    onKeyUp={onChangeDimension}
                />
            </div>
            <div className="control-line"
                style={{ display: isWinCombinationRangeAvailable ? null : "none" }}
            >
                <label
                    className="control-panel-label"
                    htmlFor="win-combination-length">Win dimension length:</label>
                <input
                    type="range"
                    id="win-combination-length"
                    name="win-combination-length"
                    className="control-panel-input"
                    value={winCombinationLength}
                    min={minWinCombinationLength} max={maxWinCombinationLength} step="1"
                    onChange={onChangeWinCombinationLength}
                />
                <span>{winCombinationLength}</span>
            </div >
            <div className="control-line">
                <button
                    id="restart-btn"
                    className="control-panel-input"
                    onClick={onRestartClick}>

                    Restart Game
            </button>
            </div>
        </div >);
}

const mapDispatchToProps = (dispatch) => ({
    onRestartClick: () => dispatch({
        type: ActionTypes.RESTART_GAME
    }),

    onChangeDimension: (keyEvent) => {
        const { target, key } = keyEvent;
        const dimension = +target.value;

        if (key === 'Enter' && isValidDimension(dimension)) {
            dispatch({
                type: ActionTypes.CHANGE_DIMENSION,
                payload: dimension
            });
            // for current stage reset winCombinationLength on each dimension change
            dispatch({
                type: ActionTypes.CHANGE_WIN_COMBINATION_LENGTH,
                payload: dimension,
            })
        }
    },

    onChangeWinCombinationLength: (event) => {
        const newWinCombinationLength = +event.target.value;
        dispatch({
            type: ActionTypes.CHANGE_WIN_COMBINATION_LENGTH,
            payload: newWinCombinationLength,
        })
    },
});

const mapStateToProps = ({ dimension: maxWinCombinationLength, winCombinationLength }) => ({
    isWinCombinationRangeAvailable: maxWinCombinationLength > MIN_DIMENSION,
    maxWinCombinationLength,
    minWinCombinationLength: MIN_DIMENSION,
    winCombinationLength,
});

function isValidDimension(dimension) {
    return dimension >= MIN_DIMENSION;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ControlPanel);
