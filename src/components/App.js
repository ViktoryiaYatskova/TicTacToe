import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import Grid from './grid';
import ActionTypes from '../constants/ActionTypes';

class App extends Component {
    render() {
        return (
            <div>
                <Grid/>
                <button
                    className="restart-btn"
                    onClick={this.props.onRestartClick}>

                    Restart Game
                </button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    onRestartClick: () => dispatch({
        type: ActionTypes.RESTART_GAME
    })
});

export default connect(
    null,
    mapDispatchToProps
)(App);
