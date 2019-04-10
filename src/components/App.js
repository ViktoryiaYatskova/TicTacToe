import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from './grid';
import ActionTypes from '../constants/ActionTypes';
import ControlPanel from './control-panel';
import './app.css';

class App extends Component {
    render() {
        return (
            <div>
                <Grid />
                <ControlPanel onRestartClick={this.props.onRestartClick} />
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
