import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './cell.css';
import { CellStateClasses } from '../../constants/Constants';
import ActionTypes from '../../constants/ActionTypes';
import { connect } from 'react-redux';

const Cell = ({cellState, coordinates, onCellClick }) =>
    (<button
        className="cell {CellStateClasses[state]}"
        onClick={() => onCellClick(coordinates)}
    />);

const mapDispatchToProps = dispatch => ({
    onCellClick: (coordinates) => dispatch({
        type: ActionTypes.TOGGLE_CELL,
        payload: coordinates,
    })
});

export default connect(
    {},
    mapDispatchToProps
)(Cell);
