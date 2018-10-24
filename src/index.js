import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { register as registerServiceWorker } from './registerServiceWorker';
import { createStore } from 'redux';
import rootReducer from './reducers/RootReducer';
import App from './components/App';

const store = createStore(rootReducer)

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App/>
        </Provider>
    </Router>,
    document.getElementById('root')
  );

registerServiceWorker();
