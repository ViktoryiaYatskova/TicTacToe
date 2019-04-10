import React, { Component } from 'react';
import Grid from './grid';
import ControlPanel from './control-panel';
import './app.css';

class App extends Component {
    render() {
        return (
            <div>
                <Grid />
                <ControlPanel />
            </div>
        );
    }
}

export default App;
