import React from 'react';
import './cell.css';
import { CellStateClasses } from '../../../constants/Constants';
import ActionTypes from '../../../constants/ActionTypes';
import { connect } from 'react-redux';

const Cell = ({cellState, coordinates, onCellClick, isWinCell }) =>
    (<button
        className={`
            cell
            ${CellStateClasses[cellState]}
            ${isWinCell ? 'win-cell' : ''}`
        }
        onClick={() => onCellClick(coordinates)}
    />);

const mapDispatchToProps = (dispatch) => ({
    onCellClick: (coordinates) => dispatch({
        type: ActionTypes.MAKE_STEP,
        payload: coordinates,
    })
});

export default connect(
    null,
    mapDispatchToProps
)(Cell);
