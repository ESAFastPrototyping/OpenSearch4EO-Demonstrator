import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

window.dispatcher = function() {
    window.sListener();
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
