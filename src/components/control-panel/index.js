import React from 'react';
import './control-panel.css';

const ControlPanel = (props) => (
    <div className="control-panel">
        <button
            className="restart-btn"
            onClick={props.onRestartClick}>

            Restart Game
        </button>
    </div>
);

export default ControlPanel;
