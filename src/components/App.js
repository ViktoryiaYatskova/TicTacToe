import React, { Component } from 'react';
import Grid from './grid/grid';
import ControlPanel from './control-panel/control-panel';
import './app.css';

class App extends Component {
    render() {
        return (<>
            <Grid />
            <ControlPanel />
        </>);
    }
}

export default App;