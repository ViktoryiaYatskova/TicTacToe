import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './grid.css';
import Cell from '../cell';
import { convertCellIndexToCoordinated } from '../../Helpers';
import { connect } from 'react-redux';
import { cells } from '../../Selectors';

const Grid = ({ cells }) =>
    (<div className="grid">
        {cells.map((cell, index) =>
            <Cell cellState={cell} coordinates={convertCellIndexToCoordinated(index)}/>
        )}
    </div>);

export default connect({ cells })(Grid);
